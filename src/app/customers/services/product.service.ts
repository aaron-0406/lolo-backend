import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import config from "../../../config/config";
import { ProductType } from "../types/product.tyoe";

const { models } = sequelize;

class ProductService {
  constructor() {}

  async getByClientCode(code: string): Promise<ProductType[]> {
    const rta = await models.PRODUCT.findAll({
      where: {
        clientCode: code,
      },
    });
    return JSON.parse(JSON.stringify(rta));
  }

  async getByProductCode(code: string) {
    const product = await models.PRODUCT.findOne({
      where: {
        code,
      },
    });
    if (!product) throw boom.notFound("Producto no encontrado");
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

  async create(product: ProductType) {
    const newProduct = await models.PRODUCT.create(product);
    return newProduct;
  }

  async update(product: ProductType, id: number) {
    const productFound = await this.getByProductId(id);
    await productFound.update(product);
    const productEdited = await this.getByProductId(id);
    return productEdited;
  }

  async change(product: Partial<ProductType>, id: number) {
    const productFound = await this.getByProductId(id);
    await productFound.update(product);
    return product;
  }

  async delete(id: number) {
    const product = await this.getByProductId(id);
    await product.destroy();
    return Number(id);
  }
}

export default ProductService;
