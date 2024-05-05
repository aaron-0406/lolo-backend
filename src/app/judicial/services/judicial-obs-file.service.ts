import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialObsFileType } from "../types/judicial-obs-file.type";
import { isFileStoredIn } from "../../../libs/helpers";
import path from "path";
import { deleteFileBucket, readFile } from "../../../libs/aws_bucket";
import config from "../../../config/config";

const { models } = sequelize;

class JudicialObservationService {
  constructor() {}

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_OBS_FILE.findAll({
      where: { customerHasBankId: chb },
    });
    return rta;
  }

  async findByID(id: string) {
    const judiciaObsFile = await models.JUDICIAL_OBS_FILE.findOne({
      where: {
        id,
      },
    });

    if (!judiciaObsFile) {
      throw boom.notFound("Observación Judicial no encontrada");
    }

    return judiciaObsFile;
  }

  async findOne(
    idCustomer: number,
    chb: number,
    code: string,
    judicialFileCaseId: number,
    id: number
  ) {
    const file = await models.JUDICIAL_OBS_FILE.findOne({
      where: {
        id,
      },
    });

    if (!file) {
      throw boom.notFound("Archivo no encontrado");
    }
    const isStored = isFileStoredIn(
      path.join(__dirname, "../../../public/download"),
      file.dataValues.name
    );
    if (!isStored) {
      await readFile(
        `${config.AWS_CHB_PATH}${idCustomer}/${chb}/${code}/case-file/${judicialFileCaseId}/observation/${file.dataValues.awsName}`
      );
    }
    return file;
  }

  async create(data: JudicialObsFileType) {
    const newJudiciaObsFile = await models.JUDICIAL_OBS_FILE.create(data);
    return newJudiciaObsFile;
  }

  async update(id: string, changes: JudicialObsFileType) {
    const judiciaObsFile = await this.findByID(id);
    const rta = await judiciaObsFile.update(changes);
    return rta;
  }

  async delete(
    id: string,
    idCustomer: number,
    chb: number,
    code: string,
    judicialFileCaseId: number
  ) {
    const judiciaObsFile = await this.findByID(id);
    await judiciaObsFile.destroy();
    await deleteFileBucket(
      `${config.AWS_CHB_PATH}${idCustomer}/${chb}/${code}/case-file/${judicialFileCaseId}/observation/${judiciaObsFile.dataValues.awsName}`
    );
    return { id };
  }
}

export default JudicialObservationService;
