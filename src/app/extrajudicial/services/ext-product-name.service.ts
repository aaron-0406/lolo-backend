import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ExtProductNameType } from "../types/ext-product-name";

const { models } = sequelize;

class ExtProductNameService {
  constructor() {}

  async findAll() {
    const rta = await models.EXT_PRODUCT_NAME.findAll();
    return rta;
  }

  async findAllByCHB(chb: string) {
    const rta = await models.EXT_PRODUCT_NAME.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });

    if (!rta) {
      throw boom.notFound("Nombres de productos no encontrados");
    }

    return rta;
  }

  async findByID(id: string) {
    const extProductName = await models.EXT_PRODUCT_NAME.findOne({
      where: {
        id_ext_product_name: id,
      },
    });

    if (!extProductName) {
      throw boom.notFound("Nombre de producto no encontrado");
    }
    return extProductName;
  }

  async create(data: ExtProductNameType) {
    const newProductName = await models.EXT_PRODUCT_NAME.create(data);
    return newProductName;
  }

  async update(id: string, changes: ExtProductNameType) {
    const extProductName = await this.findByID(id);
    const rta = await extProductName.update(changes);

    return rta;
  }

  async delete(id: string) {
    const extProductName = await this.findByID(id);
    await extProductName.destroy();

    return { id };
  }
}

export default ExtProductNameService;
