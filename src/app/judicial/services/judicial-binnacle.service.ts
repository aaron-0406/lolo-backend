import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialBinnacleType } from "../types/judicial-binnacle.type";
import config from "../../../config/config";
import { uploadFile } from "../../../libs/aws_bucket";
import { deleteFile, renameFile } from "../../../libs/helpers";
import moment from "moment";
import { FindOptions, Model, Op, ModelCtor } from "sequelize";

const { models } = sequelize;

class JudicialBinnacleService {
  constructor() {}

  async findAll() {
    const judicialBinnacle = await models.JUDICIAL_BINNACLE.findAll({
      include: [
        {
          model: models.JUDICIAL_BIN_TYPE_BINNACLE,
          as: "binnacleType",
        },
        {
          model: models.JUDICIAL_BIN_PROCEDURAL_STAGE,
          as: "judicialBinProceduralStage",
        },
        {
          model: models.JUDICIAL_BIN_FILE,
          as: "judicialBinFiles",
        },
      ],
      order: [["id", "DESC"]],
    });

    return judicialBinnacle;
  }

  async findAllByCHBAndFileCase(fileCase: number, query: any) {
    const { sortBy, order } = query;

    let orderConfig: FindOptions<any>["order"] = [];

    if (sortBy && order) {
      const sortByFields = (sortBy as string).split(",");
      const orderDirections = (order as string).split(",");

      orderConfig = sortByFields.map((field, index) => {
        let sortField: string;

        switch (field.trim()) {
          case "FECHA":
            sortField = "date";
            break;

          default:
            sortField = field.trim();
        }

        return [
          sortField,
          (orderDirections[index] || "ASC").trim().toUpperCase(),
        ];
      });
    }

    const rta = await models.JUDICIAL_BINNACLE.findAll({
      include: [
        {
          model: models.JUDICIAL_BIN_TYPE_BINNACLE,
          as: "binnacleType",
        },
        {
          model: models.JUDICIAL_BIN_PROCEDURAL_STAGE,
          as: "judicialBinProceduralStage",
        },
        {
          model: models.JUDICIAL_BIN_FILE,
          as: "judicialBinFiles",
        },
      ],
      order: orderConfig,
      where: {
        judicialFileCaseId: fileCase,
      },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialBinnacle = await models.JUDICIAL_BINNACLE.findOne({
      include: [
        {
          model: models.JUDICIAL_BIN_TYPE_BINNACLE,
          as: "binnacleType",
        },
        {
          model: models.JUDICIAL_BIN_PROCEDURAL_STAGE,
          as: "judicialBinProceduralStage",
        },
        {
          model: models.JUDICIAL_BIN_FILE,
          as: "judicialBinFiles",
        },
      ],
      where: {
        id,
      },
    });

    if (!judicialBinnacle) {
      throw boom.notFound("Bitacora Judicial no encontrada");
    }

    return judicialBinnacle;
  }

  async create(
    data: JudicialBinnacleType,
    files: Array<any>,
    params: { idCustomer: number; code: string }
  ) {
    const newJudicialBinnacle = await models.JUDICIAL_BINNACLE.create({
      ...data,
    });
    const addBinFiles = files.map(async (file) => {
      const newBinFile = await models.JUDICIAL_BIN_FILE.create({
        judicialBinnacleId: newJudicialBinnacle.dataValues.id,
        originalName: file.originalname,
        nameOriginAws: "",
        customerHasBankId: data.customerHasBankId,
        size: file.size,
      });

      const newFileName = `${newBinFile.dataValues.id}-${file.filename}`;
      await renameFile(`../public/docs/`, file.filename, newFileName);
      file.filename = newFileName;

      // UPLOAD TO AWS
      await uploadFile(
        file,
        `${config.AWS_CHB_PATH}${params.idCustomer}/${data.customerHasBankId}/${params.code}/case-file/${data.judicialFileCaseId}/binnacle`
      );
      // UPDATE NAME IN DATABASE
      newBinFile.update({
        nameOriginAws: file.filename,
      });

      // DELETE TEMP FILE
      await deleteFile("../public/docs", file.filename);
    });

    await Promise.all(addBinFiles);
    const binnacle = await this.findByID(newJudicialBinnacle.dataValues.id);
    const allBinFiles = await models.JUDICIAL_BIN_FILE.findAll({
      where: {
        judicialBinnacleId: newJudicialBinnacle.dataValues.id,
      },
    });

    return { binnacle, allBinFiles };
  }

  async update(
    id: string,
    changes: JudicialBinnacleType,
    files: Array<any>,
    params: { idCustomer: number; code: string }
  ) {
    try {
      const judicialBinnacle = await this.findByID(id);
      const oldJudicialBinacle = { ...judicialBinnacle.get() };
      console.log(changes)
      await judicialBinnacle.update(changes);
      files.forEach(async (file) => {
        const newBinFile = await models.JUDICIAL_BIN_FILE.create({
          judicialBinnacleId: id,
          originalName: file.originalname,
          nameOriginAws: "",
          customerHasBankId: judicialBinnacle.dataValues.customerHasBankId,
          size: file.size,
        });

        const newFileName = `${newBinFile.dataValues.id}-${file.filename}`;
        await renameFile(`../public/docs/`, file.filename, newFileName);
        file.filename = newFileName;

        // UPLOAD TO AWS
        await uploadFile(
          file,
          `${config.AWS_CHB_PATH}${params.idCustomer}/${judicialBinnacle.dataValues.customerHasBankId}/${params.code}/case-file/${judicialBinnacle.dataValues.judicialFileCaseId}/binnacle`
        );

        // UPDATE NAME IN DATABASE
        newBinFile.update({
          nameOriginAws: file.filename,
        });

        // DELETE TEMP FILE
        await deleteFile("../public/docs", file.filename);
      });

      const newJudicialBinnacle = await this.findByID(id);
      return { oldJudicialBinacle, newJudicialBinnacle };
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  }

  async updateTariff(id: string, changes: { totalTariff: number, tariffHistory:string}) {
    try {
      const judicialBinnacle = await this.findByID(id);
      const oldJudicialBinacle = { ...judicialBinnacle.get() };
      const newJudicialBinnacle = await judicialBinnacle.update(changes);
      return { oldJudicialBinacle, newJudicialBinnacle };
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  }

  async delete(id: string) {
    const judicialBinnacle = await this.findByID(id);
    const oldJudicialBinacle = { ...judicialBinnacle.get() };
    await judicialBinnacle.destroy();

    return oldJudicialBinacle;
  }

  // INFO: LOGIC FOR JOBS
  async findAllBinnaclesByCHBJob(chb: number) {
    try {
      const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

      const subqueryResults = await sequelize.query(
        `
          SELECT jb1.id_judicial_binnacle
          FROM JUDICIAL_BINNACLE AS jb1
          JOIN (
            SELECT judicial_file_case_id_judicial_file_case AS judicialFileCaseId,
                   MIN(ABS(TIMESTAMPDIFF(SECOND, date, '${currentDate}'))) AS minDiff
            FROM JUDICIAL_BINNACLE
            WHERE deleted_at IS NULL
            GROUP BY judicial_file_case_id_judicial_file_case
          ) AS jb2
          ON jb1.judicial_file_case_id_judicial_file_case = jb2.judicialFileCaseId
          AND ABS(TIMESTAMPDIFF(SECOND, jb1.date, '${currentDate}')) = jb2.minDiff
          WHERE jb1.customer_has_bank_id_customer_has_bank = ? AND jb1.deleted_at IS NULL`,
        {
          replacements: [chb],
        }
      );

      const relevantIds = subqueryResults[0].map(
        (result: any) => result.id_judicial_binnacle
      );

      const rta = await models.JUDICIAL_BINNACLE.findAll({
        where: {
          id: {
            [Op.in]: relevantIds,
          },
          customer_has_bank_id_customer_has_bank: chb,
          deleted_at: null,
        },
        include: [
          {
            model: models.JUDICIAL_CASE_FILE,
            as: "judicialFileCase",
            include: [
              {
                model: models.CUSTOMER_USER,
                as: "responsibleUser",
                attributes: ["id", "name"],
              },
              {
                model: models.CLIENT,
                as: "client",
                include: [
                  {
                    model: models.CITY,
                    as: "city",
                  },
                ],
              },
              {
                model: models.JUDICIAL_COURT,
                as: "judicialCourt",
              },
            ],
          },
          {
            model: models.CUSTOMER_HAS_BANK,
            as: "customerHasBank",
            include: [
              {
                model: models.BANK,
                as: "bank",
              },
            ],
          },
        ],
        raw: true,
      });

      return rta;
    } catch (error) {
      console.error("Error in findAllBinnaclesByCHBJob:", error);
      throw error;
    }
  }
}

export default JudicialBinnacleService;
