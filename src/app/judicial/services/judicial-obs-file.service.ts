import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialObsFileType } from "../types/judicial-obs-file.type";
import { deleteFile, isFileStoredIn } from "../../../libs/helpers";
import {
  deleteFileBucket,
  readFile,
  uploadFile,
} from "../../../libs/aws_bucket";
import config from "../../../config/config";
import path from "path";

const { models } = sequelize;

type CreateParam = {
  code: number;
  idCustomer: number;
  idJudicialCaseFile: number;
  files: Express.Multer.File[];
};
class judicialObsFileService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_OBS_FILE.findAll();
    return rta;
  }

  async findAllByCHBAndJudicialObs(chb: string, judicialObservationId: string) {
    const rta = await models.JUDICIAL_OBS_FILE.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
        judicial_observation_id_judicial_observation: judicialObservationId,
      },
    });

    if (!rta) {
      throw boom.notFound("Archivos no encontrados");
    }

    return rta;
  }

  async findByID(id: string) {
    const judicialObsFile = await models.JUDICIAL_OBS_FILE.findOne({
      where: {
        id_judicial_obs_file: id,
      },
    });

    if (!judicialObsFile) {
      throw boom.notFound("Archivo no encontrado");
    }
    return judicialObsFile;
  }

  async findOne(
    idCustomer: string,
    code: string,
    idJudicialCaseFile: string,
    id: string
  ) {
    const judicialObsFile = await models.JUDICIAL_OBS_FILE.findByPk(id);

    if (!judicialObsFile) {
      throw boom.notFound("Archivo no encontrado");
    }

    const isStored = isFileStoredIn(
      path.join(__dirname, "../../../public/download"),
      judicialObsFile.dataValues.originalName
    );

    if (!isStored) {
      await readFile(
        `${config.AWS_CHB_PATH}${idCustomer}/${judicialObsFile.dataValues.customerHasBankId}/${code}/case-file/${idJudicialCaseFile}/observation/${judicialObsFile.dataValues.awsName}`
      );
    }
    return judicialObsFile;
  }

  async uploadObsFile(data: CreateParam, dataFile: JudicialObsFileType) {
    const { code, idCustomer, idJudicialCaseFile } = data;
    const filesAdded = [];

    const awsName = `${dataFile.id}-${dataFile.originalName}-${
      dataFile.createdAt.getMonth() + 1
    }-${dataFile.createdAt.getFullYear()}`;

    for (let i = 0; i < data.files.length; i++) {
      // UPLOAD TO AWS
      await uploadFile(
        data.files[i],
        `${config.AWS_CHB_PATH}${idCustomer}/${dataFile.customerHasBankId}/${code}/case-file/${idJudicialCaseFile}/observation/${awsName}`
      );

      // STORED IN DATABASE
      const newFile = await this.create({
        ...dataFile,
        awsName: awsName,
      });

      // DELETE TEMP FILE
      await deleteFile("../public/docs", dataFile.originalName);

      // ADD FILE
      filesAdded.push(newFile);
    }

    return filesAdded;
  }

  async create(data: JudicialObsFileType) {
    const newJudicialObsFile = await models.JUDICIAL_OBS_FILE.create(data);
    return newJudicialObsFile;
  }

  async update(id: string, changes: JudicialObsFileType) {
    const judicialObsFile = await this.findByID(id);
    const rta = await judicialObsFile.update(changes);

    return rta;
  }

  async delete(id: string) {
    const judicialObsFile = await this.findByID(id);
    await judicialObsFile.destroy();

    return { id };
  }
}

export default judicialObsFileService;
