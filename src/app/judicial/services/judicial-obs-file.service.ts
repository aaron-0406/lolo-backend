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
