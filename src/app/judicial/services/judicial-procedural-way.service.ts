import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialProceduralWayType } from "../types/judicial-procedural-way.type";

const { models } = sequelize;

class JudicialProceduralWayService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_PROCEDURAL_WAY.findAll();
    return rta;
  }

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_PROCEDURAL_WAY.findAll({
      where: { customerHasBankId: chb },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialProceduralWay = await models.JUDICIAL_PROCEDURAL_WAY.findOne({
      where: {
        id,
      },
    });

    if (!judicialProceduralWay)
      throw boom.notFound("Vía procedimental no encontrada");

    return judicialProceduralWay;
  }

  async create(data: JudicialProceduralWayType) {
    const newJudicialProceduralWay =
      await models.JUDICIAL_PROCEDURAL_WAY.create(data);
    return newJudicialProceduralWay;
  }

  async update(id: string, changes: JudicialProceduralWayType) {
    const judicialProceduralWay = await this.findByID(id);
    const oldJudicialProceduralWay = { ...judicialProceduralWay.get() };
    const newJudicialProceduralWay = await judicialProceduralWay.update(changes);

    return { oldJudicialProceduralWay, newJudicialProceduralWay };
  }

  async delete(id: string) {
    const judicialProceduralWay = await this.findByID(id);
    const oldJudicialProceduralWay = { ...judicialProceduralWay.get() };
    await judicialProceduralWay.destroy();

    return oldJudicialProceduralWay;
  }
}

export default JudicialProceduralWayService;
