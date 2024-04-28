import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialBinnacleType } from "../types/judicial-binnacle.type";
import config from "../../../config/config";
import { uploadFile } from "../../../libs/aws_bucket";
import { deleteFile } from "../../../libs/helpers";

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
          model: models.JUDICIAL_BIN_PROCEDURAL_STAGE,
          as: "judicialBinProceduralStage",
        },
        {
          model: models.JUDICIAL_BIN_FILE,
          as: "judicialBinFiles",
        },
      ],
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

  async create(data: JudicialBinnacleType, files: Array<any>) {
    const newJudicialBinnacle = await models.JUDICIAL_BINNACLE.create(data);

    files.forEach(async (file) => {
      const { filename, originalname } = file;
      const newBinFile = await models.JUDICIAL_BIN_FILE.create({
        judicialBinnacleId: newJudicialBinnacle.dataValues.id,
        originalName: file.originalname,
        nameOriginAws: "",
        customerHasBankId: data.customerHasBankId,
      });

      const fileCase = await models.JUDICIAL_CASE_FILE.findByPk(
        data.judicialFileCaseId
      );
      const client = await models.CLIENT.findByPk(
        fileCase?.dataValues.clientId
      );
      const customerHasBank = await models.CUSTOMER_HAS_BANK.findByPk(
        data.customerHasBankId
      );

      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const name_origin_aws = `${newBinFile.dataValues.id}-${month}-${year}-${originalname}`;
      // UPLOAD TO AWS
      await uploadFile(
        file,
        `${config.AWS_CHB_PATH}${customerHasBank?.dataValues.idCustomer}/${data.customerHasBankId}/${client?.dataValues.code}/case-file/${data.judicialFileCaseId}/binnacle/${name_origin_aws}`
      );

      // UPDATE NAME IN DATABASE
      newBinFile.update({
        nameOriginAws: name_origin_aws,
      });

      // DELETE TEMP FILE
      await deleteFile("../public/docs", filename);
    });
    const binnacle = await this.findByID(newJudicialBinnacle.dataValues.id);

    return binnacle;
  }

  async update(id: string, changes: JudicialBinnacleType, files: Array<any>) {
    const judicialBinnacle = await this.findByID(id);
    await judicialBinnacle.update(changes);
    files.forEach(async (file) => {
      const { filename, originalname } = file;
      const newBinFile = await models.JUDICIAL_BIN_FILE.create({
        judicialBinnacleId: id,
        originalName: file.originalname,
        nameOriginAws: "",
        customerHasBankId: judicialBinnacle.dataValues.customerHasBankId,
      });

      const fileCase = await models.JUDICIAL_CASE_FILE.findByPk(
        judicialBinnacle.dataValues.judicialFileCaseId
      );

      const client = await models.CLIENT.findByPk(
        fileCase?.dataValues.clientId
      );

      const customerHasBank = await models.CUSTOMER_HAS_BANK.findByPk(
        judicialBinnacle.dataValues.customerHasBankId
      );

      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const name_origin_aws = `${newBinFile.dataValues.id}-${month}-${year}-${originalname}`;
      // UPLOAD TO AWS
      await uploadFile(
        file,
        `${config.AWS_CHB_PATH}${customerHasBank?.dataValues.idCustomer}/${judicialBinnacle.dataValues.customerHasBankId}/${client?.dataValues.code}/case-file/${judicialBinnacle.dataValues.judicialFileCaseId}/binnacle/${name_origin_aws}`
      );

      // UPDATE NAME IN DATABASE
      newBinFile.update({
        nameOriginAws: name_origin_aws,
      });

      // DELETE TEMP FILE
      await deleteFile("../public/docs", filename);
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
