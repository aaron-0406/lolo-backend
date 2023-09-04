import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialCourtType } from "../types/judicial-court.type";

const { models } = sequelize;

class JudicialCourtService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_COURT.findAll();
    return rta;
  }
  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_COURT.findAll({
      where: { customerHasBankId: { chb } },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialCourt = await models.JUDICIAL_COURT.findOne({
      where: {
        id,
      },
    });

    if (!judicialCourt) {
      throw boom.notFound("Corte no encontrado");
    }
    
    return judicialCourt;
  }

  async create(data: JudicialCourtType) {
    const newJudicialCourt = await models.JUDICIAL_COURT.create(data);
    return newJudicialCourt;
  }

  async update(id: string, changes: JudicialCourtType) {
    const judicialCourt = await this.findByID(id);
    const rta = await judicialCourt.update(changes);

    return rta;
  }

  async delete(id: string) {
    const court = await this.findByID(id);
    await court.destroy();

    return { id };
  }
}

export default JudicialCourtService;
