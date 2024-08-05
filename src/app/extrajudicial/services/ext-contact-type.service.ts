import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ExtContactTypeType } from "../types/ext-contact-type.type";

const { models } = sequelize;

class ExtTagGroupService {
  constructor() {}

  async findAll() {
    const rta = await models.EXT_CONTACT_TYPE.findAll();
    return rta;
  }

  async findAllByCHB(chb: string) {
    const rta = await models.EXT_CONTACT_TYPE.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });

    if (!rta) {
      throw boom.notFound("tipos de contactos no encontrados");
    }

    return rta;
  }

  async findByID(id: string) {
    const extContactType = await models.EXT_CONTACT_TYPE.findOne({
      where: {
        id_ext_contact_type: id,
      },
    });

    if (!extContactType) {
      throw boom.notFound("tipo de contactos no encontrado");
    }
    return extContactType;
  }

  async create(data: ExtContactTypeType) {
    const newContactType = await models.EXT_CONTACT_TYPE.create(data);
    return newContactType;
  }

  async update(id: string, changes: ExtContactTypeType) {
    const extContactType = await this.findByID(id);
    const rta = await extContactType.update(changes);

    return rta;
  }

  async delete(id: string) {
    const extContactType = await this.findByID(id);
    await extContactType.destroy();

    return { id };
  }
}

export default ExtTagGroupService;
