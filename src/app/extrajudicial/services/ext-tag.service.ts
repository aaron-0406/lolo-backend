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
      include: [
        {
          model: models.EXT_TAG_GROUP,
          as: "extTagGroup",
          foreignKey: "tagGroupId",
          identifier: "id",
          attributes: ["name"],
        },
      ],
      order: [["created_at", "DESC"]],
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });

    return rta;
  }

  async findAllByCHBAndTagGroupId(chb: string, tagGroupId: string) {
    const rta = await models.EXT_TAG.findAll({
      order: [["created_at", "DESC"]],
      where: {
        customer_has_bank_id_customer_has_bank: chb,
        tag_group_id_group_tag: tagGroupId,
      },
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
    const oldExtTag = { ...extTag.get() };
    const newExtTag = await extTag.update(changes);

    return { oldExtTag, newExtTag };
  }

  async updateAction(id: string, action: boolean) {
    const extTag = await this.findByID(id);
    const oldExtTag = { ...extTag.get() };
    const newExtTag = await extTag.update({ ...extTag, action });

    return { oldExtTag, newExtTag };
  }

  async delete(id: string) {
    const extTag = await this.findByID(id);
    const oldExtTag = { ...extTag.get() };
    await extTag.destroy();

    return oldExtTag;
  }
}

export default ExtTagService;
