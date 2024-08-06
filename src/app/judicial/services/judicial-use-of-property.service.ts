import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialUseOfPropertyType } from "../types/judicial-use-of-property.type";

const { models } = sequelize;

class JudicialUseOfPropertyService {
  constructor() {}

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_USE_OF_PROPERTY.findAll({
      where: { customerHasBankId: chb },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialUseOfProperty = await models.JUDICIAL_USE_OF_PROPERTY.findOne(
      {
        where: {
          id,
        },
      }
    );

    if (!judicialUseOfProperty) {
      throw boom.notFound("Uso del Bien no encontrada");
    }

    return judicialUseOfProperty;
  }

  async create(data: JudicialUseOfPropertyType) {
    const newJudicialUseOfProperty =
      await models.JUDICIAL_USE_OF_PROPERTY.create(data);
    return newJudicialUseOfProperty;
  }

  async update(id: string, changes: JudicialUseOfPropertyType) {
    const judicialUseOfProperty = await this.findByID(id);
    const oldJudicialUseOfProperty = { ...judicialUseOfProperty.get() };
    const newJudicialUseOfProperty = await judicialUseOfProperty.update(changes);
    return { oldJudicialUseOfProperty, newJudicialUseOfProperty };
  }

  async delete(id: string) {
    const useOfProperty = await this.findByID(id);
    const oldJudicialUseOfProperty = { ...useOfProperty.get() };
    await useOfProperty.destroy();

    return oldJudicialUseOfProperty;
  }
}

export default JudicialUseOfPropertyService;
