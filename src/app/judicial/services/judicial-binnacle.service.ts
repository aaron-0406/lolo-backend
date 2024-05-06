import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialBinnacleType } from "../types/judicial-binnacle.type";
import config from "../../../config/config";
import { uploadFile } from "../../../libs/aws_bucket";
import { deleteFile, renameFile } from "../../../libs/helpers";

const { models } = sequelize;

class JudicialBinnacleService {
  constructor() {}

  async findAllByCHBAndFileCase(fileCase: number) {
    const rta = await models.JUDICIAL_BINNACLE.findAll({
      include: [
        {
          model: models.JUDICIAL_BIN_TYPE_BINNACLE,
          as: "binnacleType",
        },
        {
          model: models.JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION,
          as: "judicialBinDefendantProceduralAction",
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
          model: models.JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION,
          as: "judicialBinDefendantProceduralAction",
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
    files.forEach(async (file) => {
      const newBinFile = await models.JUDICIAL_BIN_FILE.create({
        judicialBinnacleId: newJudicialBinnacle.dataValues.id,
        originalName: file.originalname,
        nameOriginAws: "",
        customerHasBankId: data.customerHasBankId,
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
    const binnacle = await this.findByID(newJudicialBinnacle.dataValues.id);

    return binnacle;
  }

  async update(
    id: string,
    changes: JudicialBinnacleType,
    files: Array<any>,
    params: { idCustomer: number; code: string }
  ) {
    const judicialBinnacle = await this.findByID(id);
    await judicialBinnacle.update(changes);
    files.forEach(async (file) => {
      const newBinFile = await models.JUDICIAL_BIN_FILE.create({
        judicialBinnacleId: id,
        originalName: file.originalname,
        nameOriginAws: "",
        customerHasBankId: judicialBinnacle.dataValues.customerHasBankId,
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
    return newJudicialBinnacle;
  }

  async delete(id: string) {
    const judicialBinnacle = await this.findByID(id);
    await judicialBinnacle.destroy();

    return { id };
  }
}

export default JudicialBinnacleService;
