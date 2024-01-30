import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ExtTagGroupType } from "../types/ext-tag-group.type";

const { models } = sequelize;

class ExtTagGroupService {
  constructor() {}

  async findAll() {
    const rta = await models.EXT_TAG_GROUP.findAll();
    return rta;
  }

  async findAllByCHB(chb: string) {
    const rta = await models.EXT_TAG_GROUP.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
      order: [["created_at", "DESC"]],
    });

    return rta;
  }

  async findByID(id: string) {
    const extTagGroup = await models.EXT_TAG_GROUP.findOne({
      where: {
        id_ext_tag_group: id,
      },
    });

    if (!extTagGroup) {
      throw boom.notFound("Grupo de etiquetas no encontrada");
    }
    return extTagGroup;
  }

  async create(data: ExtTagGroupType) {
    const newExtTagGroup = await models.EXT_TAG_GROUP.create(data);
    return newExtTagGroup;
  }

  async update(id: string, changes: ExtTagGroupType) {
    const extTagGroup = await this.findByID(id);
    const rta = await extTagGroup.update(changes);

    return rta;
  }

  async delete(id: string) {
    const extTagGroup = await this.findByID(id);
    await extTagGroup.destroy();

    return { id };
  }
}

export default ExtTagGroupService;
