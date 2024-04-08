import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ExtContactType } from "../types/ext-contact.type";

const { models } = sequelize;

class ExtContactService {
  constructor() {}

  async findAll() {
    const rta = await models.EXT_CONTACT.findAll();
    return rta;
  }

  async findAllByClient(clientID: string) {
    const rta = await models.EXT_CONTACT.findAll({
      where: {
        client_id_client: clientID,
      },
      include: {
        model: models.EXT_CONTACT_TYPE,
        as: "extContactType",
      },
      order: [["created_at", "DESC"]],
    });

    return rta;
  }

  async findByID(id: string) {
    const extContact = await models.EXT_CONTACT.findOne({
      where: {
        id_ext_contact: id,
      },
      include: {
        model: models.EXT_CONTACT_TYPE,
        as: "extContactType",
        attributes: ["contactType", "customerHasBankId"],
      },
    });

    if (!extContact) {
      throw boom.notFound("Contacto no encontrado");
    }
    return extContact;
  }

  async create(data: ExtContactType) {
    const newExtContact = await models.EXT_CONTACT.create(data);
    await newExtContact.reload({
      include: {
        model: models.EXT_CONTACT_TYPE,
        as: "extContactType",
        attributes: ["contactType", "customerHasBankId"],
      },
    });
    return newExtContact;
  }

  async updateState(id: string, state: boolean) {
    const extContact = await this.findByID(id);
    const rta = await extContact.update({ ...extContact, state });
    await rta.reload({
      include: {
        model: models.EXT_CONTACT_TYPE,
        as: "extContactType",
        attributes: ["contactType", "customerHasBankId"],
      },
    });
    return rta;
  }

  async update(id: string, changes: ExtContactType) {
    const extContact = await this.findByID(id);
    const rta = await extContact.update(changes);
    await rta.reload({
      include: {
        model: models.EXT_CONTACT_TYPE,
        as: "extContactType",
        attributes: ["contactType", "customerHasBankId"],
      },
    });
    return rta;
  }

  async delete(id: string) {
    const extContact = await this.findByID(id);
    await extContact.destroy();

    return { id };
  }
}

export default ExtContactService;
