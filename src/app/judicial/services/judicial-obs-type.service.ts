import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialObsTypeType } from "../types/judicial-obs-type.type";

const { models } = sequelize;

class judicialObsTypeService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_OBS_TYPE.findAll();
    return rta;
  }

  async findAllByCHB(chb: string) {
    const rta = await models.JUDICIAL_OBS_TYPE.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });

    if (!rta) {
      throw boom.notFound("tipos de observaciones no encontrados");
    }

    return rta;
  }

  async findByID(id: string) {
    const judicialObsType = await models.JUDICIAL_OBS_TYPE.findOne({
      where: {
        id_judicial_obs_type: id,
      },
    });

    if (!judicialObsType) {
      throw boom.notFound("tipo de observación no encontrado");
    }
    return judicialObsType;
  }

  async create(data: JudicialObsTypeType) {
    const newJudicialObsType = await models.JUDICIAL_OBS_TYPE.create(data);
    return newJudicialObsType;
  }

  async update(id: string, changes: JudicialObsTypeType) {
    const judicialObsType = await this.findByID(id);
    const rta = await judicialObsType.update(changes);

    return rta;
  }

  async delete(id: string) {
    const judicialObsType = await this.findByID(id);
    await judicialObsType.destroy();

    return { id };
  }
}

export default judicialObsTypeService;
