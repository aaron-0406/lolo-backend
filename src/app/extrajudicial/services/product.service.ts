import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ProductType } from "../types/product.tyoe";

const { models } = sequelize;

class ProductService {
  constructor() {}

  async getByClientCode(code: string): Promise<ProductType[]> {
    const rta = await models.PRODUCT.findAll({
      where: {
        clientCode: code,
      },
      include: [{ model: models.NEGOTIATION, as: "negotiation" }],
    });
    return JSON.parse(JSON.stringify(rta));
  }

  async getByProductCode(code: string) {
    const product = await models.PRODUCT.findOne({
      where: {
        code,
      },
      include: [{ model: models.NEGOTIATION, as: "negotiation" }],
    });
    // if (!product) throw boom.notFound("Producto no encontrado");
    return product;
  }

  async getByProductId(id: number) {
    const product = await models.PRODUCT.findOne({
      where: {
        id,
      },
    });
    if (!product) throw boom.notFound("Producto no encontrado");
    return product;
  }

  async getAllByCustomerId(id: number): Promise<ProductType[]> {
    const rta = await models.PRODUCT.findAll({
      where: {
        customerId: id,
      },
    });
    return JSON.parse(JSON.stringify(rta));
  }

  async create(product: Omit<ProductType, "id" | "funcionarioId" | "cityId">) {
    const pdc = await models.PRODUCT.findOne({
      where: {
        code: product.code,
        customerId: product.customerId,
      },
    });

    if (!pdc) {
      const newProduct = await models.PRODUCT.create(product);
      return newProduct;
    }

    throw boom.notFound("El código de producto ya existe");
  }

  async update(product: ProductType, id: number) {
    const productFound = await this.getByProductId(id);
    await productFound.update(product);
    const productEdited = await this.getByProductId(id);
    return productEdited;
  }

  async delete(id: number) {
    const product = await this.getByProductId(id);
    await product.destroy();
    return Number(id);
  }

  async deleteByCode(code: string) {
    const product = await this.getByProductCode(code);
    if (product) await product.destroy();
    return Number(code);
  }
}

export default ProductService;
