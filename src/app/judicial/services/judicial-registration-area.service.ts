import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialRegistrationAreaType } from "../types/judicial-registration-area.type";

const { models } = sequelize;

class JudicialRegistrationAreaService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_REGISTRATION_AREA.findAll();
    return rta;
  }

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_REGISTRATION_AREA.findAll({
      where: { customerHasBankId: chb },
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_REGISTRATION_AREA,
          as: "judicialCaseFileHasRegistrationArea",
          attributes: ["id", "judicialCaseFileId", "judicialRegistrationAreaId"],
        },
      ],
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialRegistrationArea = await models.JUDICIAL_REGISTRATION_AREA.findOne({
      where: {
        id,
      },
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_REGISTRATION_AREA,
          as: "judicialCaseFileHasRegistrationArea",
          attributes: ["id", "judicialCaseFileId", "judicialRegistrationAreaId"],
        },
      ],
    });

    if (!judicialRegistrationArea) {
      throw boom.notFound("Región de Registro no encontrado");
    }

    return judicialRegistrationArea;
  }

  async create(data: JudicialRegistrationAreaType) {
    const newJudicialRegistrationArea = await models.JUDICIAL_REGISTRATION_AREA.create(data);
    await newJudicialRegistrationArea.reload({
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_REGISTRATION_AREA,
          as: "judicialCaseFileHasRegistrationArea",
          attributes: ["id", "judicialCaseFileId", "judicialRegistrationAreaId"],
        },
      ],
    });
    return newJudicialRegistrationArea;
  }

  async update(id: string, changes: JudicialRegistrationAreaType) {
    const judicialRegistrationArea = await this.findByID(id);
    const rta = await judicialRegistrationArea.update(changes);
    await rta.reload({
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_REGISTRATION_AREA,
          as: "judicialCaseFileHasRegistrationArea",
          attributes: ["id", "judicialCaseFileId", "judicialRegistrationAreaId"],
        },
      ],
    });
    return rta;
  }

  async delete(id: string) {
    const registrationArea = await this.findByID(id);
    await registrationArea.destroy();

    return { id };
  }
}

export default JudicialRegistrationAreaService;