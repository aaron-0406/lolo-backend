import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { isFileStoredIn } from "../../../libs/helpers";
import path from "path";
import { readFile } from "../../../libs/aws_bucket";
import config from "../../../config/config";

const { models } = sequelize;

class TemplateService {
  constructor() {}

  async findAllByCustomerId(id: string) {
    const rta = await models.TEMPLATE.findAll({
      where: { customerId: id },
    });
    return rta;
  }

  async findOne(id: string) {
    const template = await models.TEMPLATE.findOne({
      where: { id },
      include: { model: models.TEMPLATE_IMG, as: "template_imgs" },
    });
    if (!template) throw boom.notFound("Plantilla no encontrada");
    try {
      if (template.dataValues.templateJson !== "") {
        const isStored = isFileStoredIn(
          path.join(__dirname, "../../../public/download"),
          template.dataValues.templateJson
        );
        if (!isStored) {
          await readFile(
            `${config.AWS_PLANTILLA_PATH}${template.dataValues.customerId}/${template.dataValues.templateJson}`
          );
        }
      }
      if (template.dataValues.templatePhoto !== "") {
        const isStored = isFileStoredIn(
          path.join(__dirname, "../../../public/download"),
          template.dataValues.templatePhoto
        );
        if (!isStored) {
          await readFile(
            `${config.AWS_PLANTILLA_PATH}${template.dataValues.customerId}/${template.dataValues.templatePhoto}`
          );
        }
      }
      for (let i = 0; i < template.dataValues.template_imgs.length; i++) {
        const element = template.dataValues.template_imgs[i];
        await readFile(
          `${config.AWS_PLANTILLA_PATH}${template.dataValues.customerId}/${element.img}`
        );
      }
    } catch (error) {}
    return template;
  }
}

export default TemplateService;
