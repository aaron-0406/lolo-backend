import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialCaseFileType } from "../types/judicial-case-file.type";

const { models } = sequelize;

class JudicialCaseFileService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_CASE_FILE.findAll();
    return rta;
  }

  async findAllByClient(clientId: string) {
    const judicialCaseFile = await models.JUDICIAL_CASE_FILE.findAll({
      where: {
        clientId,
      },
    });

    if (!judicialCaseFile) {
      throw boom.notFound("Expediente no encontrado");
    }

    return judicialCaseFile;
  }

  async findByID(id: string) {
    const judicialCaseFile = await models.JUDICIAL_CASE_FILE.findOne({
      where: {
        id,
      },
    });

    if (!judicialCaseFile) {
      throw boom.notFound("Expediente no encontrado");
    }

    return judicialCaseFile;
  }

  async findByNumberCaseFile(numberCaseFile: string) {
    const judicialCaseFile = await models.JUDICIAL_CASE_FILE.findOne({
      where: {
        numberCaseFile,
      },
    });

    if (!judicialCaseFile) {
      throw boom.notFound("Expediente no encontrado");
    }
    return judicialCaseFile;
  }

  async create(data: JudicialCaseFileType) {
    const newJudicialCaseFile = await models.JUDICIAL_CASE_FILE.create(data);
    return newJudicialCaseFile;
  }

  async update(id: string, changes: JudicialCaseFileType) {
    const judicialCaseFile = await this.findByID(id);
    const rta = await judicialCaseFile.update(changes);

    return rta;
  }

  async delete(id: string) {
    const client = await this.findByID(id);
    await client.destroy();

    return { id };
  }
}

export default JudicialCaseFileService;
