import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ExtAddressType } from "../types/ext-address-type.type";

const { models } = sequelize;

class ExtAddressTypeService {
  constructor() {}

  async findAll() {
    const rta = await models.EXT_ADDRESS_TYPE.findAll();
    return rta;
  }

  async findAllByChb(chb: string) {
    const rta = await models.EXT_ADDRESS_TYPE.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });
    return rta;
  }

  async findByID(id: string) {
    const address = await models.EXT_ADDRESS_TYPE.findOne({
      where: {
        id_address_type: id,
      },
    });

    if (!address) throw boom.notFound("Tipo de dirección no encontrada");
    return address;
  }

  async create(data: ExtAddressType) {
    const newAddress = await models.EXT_ADDRESS_TYPE.create(data);
    return newAddress;
  }



  async update(id: string, changes: ExtAddressType) {
    const address = await this.findByID(id);
    const rta = await address.update(changes);
    return rta;
  }

  async delete(id: string) {
    const address = await this.findByID(id);
    await address.destroy();

    return { id };
  }
}

export default ExtAddressTypeService;
