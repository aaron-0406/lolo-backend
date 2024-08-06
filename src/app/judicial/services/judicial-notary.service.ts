import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialNotaryType } from "../types/judicial-notary.type";

const { models } = sequelize;

class JudicialNotaryService {
  constructor() {}

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_NOTARY.findAll({
      where: { customerHasBankId: chb },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialNotary = await models.JUDICIAL_NOTARY.findOne({
      where: {
        id,
      },
    });

    if (!judicialNotary) {
      throw boom.notFound("Notaria no encontrada");
    }

    return judicialNotary;
  }

  async create(data: JudicialNotaryType) {
    const newJudicialNotary = await models.JUDICIAL_NOTARY.create(data);
    return newJudicialNotary;
  }

  async update(id: string, changes: JudicialNotaryType) {
    const judicialNotary = await this.findByID(id);
    const oldJudicialNotary = { ...judicialNotary.get() };
    const newJudicialNotary = await judicialNotary.update(changes);
    return { oldJudicialNotary, newJudicialNotary };
  }

  async delete(id: string) {
    const notary = await this.findByID(id);
    const oldJudicialNotary = { ...notary.get() };
    await notary.destroy();

    return oldJudicialNotary;
  }
}

export default JudicialNotaryService;
