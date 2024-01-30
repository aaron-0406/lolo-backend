import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ExtTagType } from "../types/ext-tag.type";

const { models } = sequelize;

class ExtTagService {
  constructor() {}

  async findAll() {
    const rta = await models.EXT_TAG.findAll();
    return rta;
  }

  async findAllByCHB(chb: string) {
    const rta = await models.EXT_TAG.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
      order: [["created_at", "DESC"]],
    });

    return rta;
  }

  async findByID(id: string) {
    const extTag = await models.EXT_TAG.findOne({
      where: {
        id_ext_tag: id,
      },
    });

    if (!extTag) {
      throw boom.notFound("Etiqueta no encontrada");
    }
    return extTag;
  }

  async create(data: ExtTagType) {
    const newExtTag = await models.EXT_TAG.create(data);
    return newExtTag;
  }

  async update(id: string, changes: ExtTagType) {
    const extTag = await this.findByID(id);
    const rta = await extTag.update(changes);

    return rta;
  }

  async delete(id: string) {
    const extTag = await this.findByID(id);
    await extTag.destroy();

    return { id };
  }
}

export default ExtTagService;
