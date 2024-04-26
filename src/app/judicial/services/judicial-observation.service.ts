import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialObservationType } from "../types/judicial-observation.type";

const { models } = sequelize;

class judicialObservationService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_OBSERVATION.findAll();
    return rta;
  }

  async findAllByCHBAndJudicialCase(chb: string, judicialCaseId: string) {
    const rta = await models.JUDICIAL_OBSERVATION.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
        judicial_case_file_id_judicial_case_file: judicialCaseId,
      },
    });

    if (!rta) {
      throw boom.notFound("Observaciones no encontradas");
    }

    return rta;
  }

  async findByID(id: string) {
    const judicialObs = await models.JUDICIAL_OBSERVATION.findOne({
      where: {
        id_judicial_observation: id,
      },
    });

    if (!judicialObs) {
      throw boom.notFound("Observación no encontrada");
    }
    return judicialObs;
  }

  async create(data: JudicialObservationType) {
    const newJudicialObs = await models.JUDICIAL_OBSERVATION.create(data);
    return newJudicialObs;
  }

  async update(id: string, changes: JudicialObservationType) {
    const judicialObsType = await this.findByID(id);
    const rta = await judicialObsType.update(changes);

    return rta;
  }

  async delete(id: string) {
    const judicialObs = await this.findByID(id);
    await judicialObs.destroy();

    return { id };
  }
}

export default judicialObservationService;
