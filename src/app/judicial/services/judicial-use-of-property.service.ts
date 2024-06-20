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
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_USE_OF_PROPERTY,
          as: "judicialCaseFileHasUseOfProperty",
          attributes: ["id", "judicialCaseFileId", "judicialUseOfPropertyId"],
        },
      ],
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialUseOfProperty = await models.JUDICIAL_USE_OF_PROPERTY.findOne({
      where: {
        id,
      },
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_USE_OF_PROPERTY,
          as: "judicialCaseFileHasUseOfProperty",
          attributes: ["id", "judicialCaseFileId", "judicialUseOfPropertyId"],
        },
      ],
    });

    if (!judicialUseOfProperty) {
      throw boom.notFound("Uso de Propiedad no encontrado");
    }

    return judicialUseOfProperty;
  }

  async create(data: JudicialUseOfPropertyType) {
    const newJudicialUseOfProperty = await models.JUDICIAL_USE_OF_PROPERTY.create(data);
    await newJudicialUseOfProperty.reload({
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_USE_OF_PROPERTY,
          as: "judicialCaseFileHasUseOfProperty",
          attributes: ["id", "judicialCaseFileId", "judicialUseOfPropertyId"],
        },
      ],
    });
    return newJudicialUseOfProperty;
  }

  async update(id: string, changes: JudicialUseOfPropertyType) {
    const judicialUseOfProperty = await this.findByID(id);
    const rta = await judicialUseOfProperty.update(changes);
    await rta.reload({
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_USE_OF_PROPERTY,
          as: "judicialCaseFileHasUseOfProperty",
          attributes: ["id", "judicialCaseFileId", "judicialUseOfPropertyId"],
        },
      ],
    });
    return rta;
  }

  async delete(id: string) {
    const useOfProperty = await this.findByID(id);
    await useOfProperty.destroy();

    return { id };
  }
}

export default JudicialUseOfPropertyService;  