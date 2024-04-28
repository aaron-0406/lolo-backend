import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialBinTypeBinnacleType } from "../types/judicial-bin-type-binnacle.type";

const { models } = sequelize;

class JudicialBinTypeBinnacleService {
  constructor() {}

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_BIN_TYPE_BINNACLE.findAll({
      where: { customerHasBankId: chb },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialBinTypeBinnacle =
      await models.JUDICIAL_BIN_TYPE_BINNACLE.findOne({
        where: {
          id,
        },
      });

    if (!judicialBinTypeBinnacle) {
      throw boom.notFound("Tipo de Bitacora Judicial no encontrada");
    }

    return judicialBinTypeBinnacle;
  }

  async create(data: JudicialBinTypeBinnacleType) {
    const newJudicialBinTypeBinnacle =
      await models.JUDICIAL_BIN_TYPE_BINNACLE.create(data);
    return newJudicialBinTypeBinnacle;
  }

  async update(id: string, changes: JudicialBinTypeBinnacleType) {
    const judicialBinTypeBinnacle = await this.findByID(id);
    const rta = await judicialBinTypeBinnacle.update(changes);
    return rta;
  }

  async delete(id: string) {
    const judicialBinTypeBinnacle = await this.findByID(id);
    await judicialBinTypeBinnacle.destroy();

    return { id };
  }
}

export default JudicialBinTypeBinnacleService;
