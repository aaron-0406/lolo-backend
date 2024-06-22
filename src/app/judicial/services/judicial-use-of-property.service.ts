import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialUseOfPropertyType } from "../types/judicial-use-of-property.type";

const { models } = sequelize;

class JudicialUseOfPropertyService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_USE_OF_PROPERTY.findAll();
    return rta;
  }

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_USE_OF_PROPERTY.findAll({
      where: { customerHasBankId: chb },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialUseOfProperty = await models.JUDICIAL_USE_OF_PROPERTY.findOne({
      where: {
        id,
      },
    });

    if (!judicialUseOfProperty) {
      throw boom.notFound("Uso de Propiedad no encontrado");
    }

    return judicialUseOfProperty;
  }

  async create(data: JudicialUseOfPropertyType) {
    const newJudicialUseOfProperty = await models.JUDICIAL_USE_OF_PROPERTY.create(data);
    return newJudicialUseOfProperty;
  }

  async update(id: string, changes: JudicialUseOfPropertyType) {
    const judicialUseOfProperty = await this.findByID(id);
    const rta = await judicialUseOfProperty.update(changes);
    return rta;
  }

  async delete(id: string) {
    const useOfProperty = await this.findByID(id);
    await useOfProperty.destroy();

    return { id };
  }
}

export default JudicialUseOfPropertyService;