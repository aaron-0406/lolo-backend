import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { TemplateHasValuesType } from "../types/template-has-values.type";

const { models } = sequelize;

class TemplateHasValuesService {
  constructor() {}

  async findAll(id: string) {
    const templates = await models.TEMPLATE_HAS_VALUES.findAll({
      where: { templateId: id },
      attributes: { exclude: ["id_template"] },
    });

    const fields = await models.ECAMPO.findAll({
      where: { templateId: id },
    });

    return { templates, fields };
  }

  async findByCustomerId(id: string) {
    const templateHasValues = await models.TEMPLATE_HAS_VALUES.findAll({
      include: {
        model: models.TEMPLATE,
        where: { customerId: id },
        as: "template",
      },
    });
    return templateHasValues;
  }

  async findOneWidthTemplate(id: string) {
    const templateHasValues = await models.TEMPLATE_HAS_VALUES.findOne({
      include: [{
        model: models.TEMPLATE,
        as: "template",
      },{
        model: models.VALUES,
        as: "values",
      }],
      where: { id },
    });
    if (!templateHasValues) throw boom.notFound("Plantilla no encontrada");
    return JSON.parse(JSON.stringify(templateHasValues));
  }

  async findOne(id: string) {
    const templateHasValues = await models.TEMPLATE_HAS_VALUES.findOne({
      where: {
        id,
      },
    });

    if (!templateHasValues) throw boom.notFound("Plantilla no encontrada");
    return templateHasValues;
  }

  async create(data: Omit<TemplateHasValuesType, "id" | "createdAt">) {
    const newTemplateHasValues = await models.TEMPLATE_HAS_VALUES.create(data);
    return newTemplateHasValues;
  }

  async update(id: string, name: string) {
    const templateHasValues = await this.findOne(id);
    const rta = await templateHasValues.update({ name });
    return rta;
  }

  async delete(id: string) {
    const templateHasValues = await this.findOne(id);
    await templateHasValues.destroy();

    return { id };
  }
}

export default TemplateHasValuesService;
