import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialRegistrationAreaType } from "../types/judicial-registration-area.type";

const { models } = sequelize;

class JudicialRegistrationAreaService {
  constructor() {}

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_REGISTRATION_AREA.findAll({
      where: { customerHasBankId: chb },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialRegistrationArea =
      await models.JUDICIAL_REGISTRATION_AREA.findOne({
        where: {
          id,
        },
      });

    if (!judicialRegistrationArea) {
      throw boom.notFound("Zona Registral no encontrada");
    }

    return judicialRegistrationArea;
  }

  async create(data: JudicialRegistrationAreaType) {
    const newJudicialRegistrationArea =
      await models.JUDICIAL_REGISTRATION_AREA.create(data);
    return newJudicialRegistrationArea;
  }

  async update(id: string, changes: JudicialRegistrationAreaType) {
    const judicialRegistrationArea = await this.findByID(id);
    const oldJudicialRegistrationArea = { ...judicialRegistrationArea.get() };
    const newJudicialRegistrationArea = await judicialRegistrationArea.update(changes);
    return { oldJudicialRegistrationArea, newJudicialRegistrationArea };
  }

  async delete(id: string) {
    const registrationArea = await this.findByID(id);
    const oldJudicialRegistrationArea = { ...registrationArea.get() };
    await registrationArea.destroy();

    return oldJudicialRegistrationArea;
  }
}

export default JudicialRegistrationAreaService;
