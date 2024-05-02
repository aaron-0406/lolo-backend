import sequelize from "../../../libs/sequelize";
import config from "../../../config/config";
import boom from "@hapi/boom";
import { deleteFile, renameFile } from "../../../libs/helpers";
import { JudicialObservationType } from "../types/judicial-observation.type";
import { uploadFile } from "../../../libs/aws_bucket";

const { models } = sequelize;

class JudicialObservationService {
  constructor() {}

  async findAllByCHBAndFileCase(fileCase: number) {
    const rta = await models.JUDICIAL_OBSERVATION.findAll({
      include: [
        {
          model: models.JUDICIAL_OBS_TYPE,
          as: "judicialObsType",
        },
        {
          model: models.JUDICIAL_OBS_FILE,
          as: "judicialObsFile",
        },
      ],
      where: {
        judicial_case_file_id_judicial_case_file: fileCase,
      },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialObservation = await models.JUDICIAL_OBSERVATION.findOne({
      include: [
        {
          model: models.JUDICIAL_OBS_TYPE,
          as: "judicialObsType",
        },
        {
          model: models.JUDICIAL_OBS_FILE,
          as: "judicialObsFile",
        },
      ],
      where: {
        id,
      },
    });

    if (!judicialObservation) {
      throw boom.notFound("Observación Judicial no encontrada");
    }

    return judicialObservation;
  }

  async create(
    data: JudicialObservationType,
    files: Array<any>,
    params: { idCustomer: number; code: string }
  ) {
    const newJudicialObservation = await models.JUDICIAL_OBSERVATION.create(
      data
    );
    files.forEach(async (file) => {
      const newObsFile = await models.JUDICIAL_OBS_FILE.create({
        judicial_observation_id_judicial_observation:
          newJudicialObservation.dataValues.id,
        original_name: file.originalname,
        aws_name: "",
        customer_has_bank_id_customer_has_bank: data.customerHasBankId,
      });

      const fecha = new Date();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();

      const newFileName = `${newObsFile.dataValues.id}-${file.originalname}-${mes}-${año}`;
      await renameFile(`../public/docs/`, file.filename, newFileName);
      file.filename = newFileName;

      // UPLOAD TO AWS
      await uploadFile(
        file,
        `${config.AWS_CHB_PATH}${params.idCustomer}/${data.customerHasBankId}/${params.code}/case-file/${data.judicialCaseFileId}/observation`
      );

      // UPDATE NAME IN DATABASE
      newObsFile.update({
        aws_name: file.filename,
      });

      // DELETE TEMP FILE
      await deleteFile("../public/docs", file.filename);
    });

    const observation = await this.findByID(
      newJudicialObservation.dataValues.id
    );

    return observation;
  }

  async update(
    id: string,
    changes: JudicialObservationType,
    files: Array<any>,
    params: { idCustomer: number; code: string }
  ) {
    const judicialObservation = await this.findByID(id);
    await judicialObservation.update(changes);
    files.forEach(async (file) => {
      const newObsFile = await models.JUDICIAL_OBS_FILE.create({
        judicial_observation_id_judicial_observation: id,
        original_name: file.originalname,
        aws_name: "",
        customer_has_bank_id_customer_has_bank:
          judicialObservation.dataValues.customerHasBankId,
      });

      const fecha = new Date();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();

      const newFileName = `${newObsFile.dataValues.id}-${file.filename}-${mes}-${año}`;
      await renameFile(`../public/docs/`, file.filename, newFileName);
      file.filename = newFileName;

      // UPLOAD TO AWS
      await uploadFile(
        file,
        `${config.AWS_CHB_PATH}${params.idCustomer}/${judicialObservation.dataValues.customerHasBankId}/${params.code}/case-file/${judicialObservation.dataValues.judicialFileCaseId}/observation`
      );

      // UPDATE NAME IN DATABASE
      newObsFile.update({
        aws_name: file.filename,
      });

      // DELETE TEMP FILE
      await deleteFile("../public/docs", file.filename);
    });

    const newJudicialObservation = await this.findByID(id);
    return newJudicialObservation;
  }

  async delete(id: string) {
    const judicialObservation = await this.findByID(id);
    await judicialObservation.destroy();

    return { id };
  }
}

export default JudicialObservationService;
