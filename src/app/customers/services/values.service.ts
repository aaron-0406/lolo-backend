import sequelize from "../../../libs/sequelize";
import { ValuesType } from "../types/values.type";
import boom from "@hapi/boom";
const { models } = sequelize;

class ValuesService {
  constructor() {}

  async findAllByTemplateHasValuesId(id: string) {
    const rta = await models.VALUES.findAll({
      where: { templateHasValuesId: id },
    });
    return rta;
  }

  async createValue(data: ValuesType) {
    const newValue = await models.VALUES.create(data);
    return newValue;
  }

  async findOne(id: number) {
    const templateHasValues = await models.VALUES.findOne({
      where: {
        id,
      },
    });

    if (!templateHasValues) throw boom.notFound("Valor no encontrado");
    return templateHasValues;
  }

  async update(id: number, data: ValuesType) {
    const value = await this.findOne(id);
    const newValue = await value.update(data);
    return newValue;
  }
}

export default ValuesService;
