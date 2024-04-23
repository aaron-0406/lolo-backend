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
      where: { customerHasBankId: chb },
      include: [
        {
          model: models.CITY,
          as: "city",
          attributes: ["id", "name"],
        },
      ],
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialCourt = await models.JUDICIAL_COURT.findOne({
      where: {
        id,
      },
      include: [
        {
          model: models.CITY,
          as: "city",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!judicialCourt) {
      throw boom.notFound("Juzgado no encontrado");
    }

    return judicialCourt;
  }

  async create(data: JudicialCourtType) {
    const newJudicialCourt = await models.JUDICIAL_COURT.create(data);
    await newJudicialCourt.reload({
      include: {
        model: models.CITY,
        as: "city",
        attributes: ["id", "name"],
      },
    });
    return newJudicialCourt;
  }

  async update(id: string, changes: JudicialCourtType) {
    const judicialCourt = await this.findByID(id);
    const rta = await judicialCourt.update(changes);
    await rta.reload({
      include: {
        model: models.CITY,
        as: "city",
        attributes: ["id", "name"],
      },
    });
    return rta;
  }

  async delete(id: string) {
    const court = await this.findByID(id);
    await court.destroy();

    return { id };
  }
}

export default JudicialCourtService;
