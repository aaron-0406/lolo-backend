import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialBinFileType } from "../types/judicial-bin-file.type";

const { models } = sequelize;

class JudicialBinnacleService {
  constructor() {}

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_BIN_FILE.findAll({
      where: { customerHasBankId: chb },
    });
    return rta;
  }

  async findByID(id: string) {
    const judiciaBinFile = await models.JUDICIAL_BIN_FILE.findOne({
      where: {
        id,
      },
    });

    if (!judiciaBinFile) {
      throw boom.notFound("Bitacora Judicial no encontrada");
    }

    return judiciaBinFile;
  }

  async create(data: JudicialBinFileType) {
    const newJudicialBinnacle = await models.JUDICIAL_BIN_FILE.create(data);
    return newJudicialBinnacle;
  }

  async update(id: string, changes: JudicialBinFileType) {
    const judiciaBinFile = await this.findByID(id);
    const rta = await judiciaBinFile.update(changes);
    return rta;
  }

  async delete(id: string) {
    const judiciaBinFile = await this.findByID(id);
    await judiciaBinFile.destroy();

    return { id };
  }
}

export default JudicialBinnacleService;
