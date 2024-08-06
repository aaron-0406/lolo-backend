import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialSedeType } from "../types/judicial-sede.type";

const { models } = sequelize;

class judicialSedeService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_SEDE.findAll();
    return rta;
  }

  async findAllByCHB(chb: string) {
    const rta = await models.JUDICIAL_SEDE.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });

    if (!rta) {
      throw boom.notFound("Sedes judiciales no encontradas");
    }

    return rta;
  }

  async findByID(id: string) {
    const judicialSede = await models.JUDICIAL_SEDE.findOne({
      where: {
        id_judicial_sede: id,
      },
    });

    if (!judicialSede) {
      throw boom.notFound("Sede judicial no encontrada");
    }
    return judicialSede;
  }

  async create(data: JudicialSedeType) {
    const newJudicialSede = await models.JUDICIAL_SEDE.create(data);
    return newJudicialSede;
  }

  async update(id: string, changes: JudicialSedeType) {
    const judicialSede = await this.findByID(id);
    const oldJudicialSede = { ...judicialSede.get() };
    const newJudicialSede = await judicialSede.update(changes);

    return { oldJudicialSede, newJudicialSede };
  }

  async delete(id: string) {
    const judicialSede = await this.findByID(id);
    const oldJudicialSede = { ...judicialSede.get() };
    await judicialSede.destroy();

    return oldJudicialSede;
  }
}

export default judicialSedeService;
