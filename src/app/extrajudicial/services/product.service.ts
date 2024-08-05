import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ProductType } from "../types/product.tyoe";

const { models } = sequelize;

class ProductService {
  constructor() {}

  //INFO: CLIENTS SECTION
  async getByClientId(clientId: number): Promise<ProductType[]> {
    const rta = await models.PRODUCT.findAll({
      where: {
        client_id: clientId,
      },
      include: [
        { model: models.NEGOTIATION, as: "negotiation" },
        {
          model: models.EXT_PRODUCT_NAME,
          as: "extProductName",
          attributes: ["id", "productName", "customerHasBankId"],
        },
        {
          model: models.JUDICIAL_CASE_FILE,
          as: "judicialCaseFile",
          attributes: ["id", "numberCaseFile"],
        },
      ],
    });
    return JSON.parse(JSON.stringify(rta));
  }

  async getByProductId(id: number) {
    const product = await models.PRODUCT.findOne({
      where: {
        id,
      },
      include: [
        {
          model: models.NEGOTIATION,
          as: "negotiation",
          attributes: ["name", "customerHasBankId"],
        },
        {
          model: models.EXT_PRODUCT_NAME,
          as: "extProductName",
          attributes: ["id", "productName", "customerHasBankId"],
        },
        {
          model: models.JUDICIAL_CASE_FILE,
          as: "judicialCaseFile",
          attributes: ["id", "numberCaseFile"],
        },
      ],
    });
    if (!product) throw boom.notFound("Producto no encontrado");
    return product;
  }

  //INFO: JUDICIAL - CASE FILE SECTION
  async getByJudicialCaseFileId(
    judicialCaseFileId: number
  ): Promise<ProductType[]> {
    const rta = await models.PRODUCT.findAll({
      where: {
        judicial_case_file_id_judicial_case_file: judicialCaseFileId,
      },
      include: [
        { model: models.NEGOTIATION, as: "negotiation" },
        {
          model: models.EXT_PRODUCT_NAME,
          as: "extProductName",
          attributes: ["id", "productName", "customerHasBankId"],
        },
        {
          model: models.JUDICIAL_CASE_FILE,
          as: "judicialCaseFile",
          attributes: ["id", "numberCaseFile"],
        },
      ],
    });

    return JSON.parse(JSON.stringify(rta));
  }

  async assignJudicialCaseFileToProducts(
    productIds: string,
    judicialCaseFileId: number
  ) {
    const listProducts = JSON.parse(productIds);

    for (const productId of listProducts) {
      await models.PRODUCT.update(
        { judicialCaseFileId },
        { where: { id: productId } }
      );
    }

    return this.getByJudicialCaseFileId(judicialCaseFileId);
  }

  async removeJudicialCaseFileFromProduct(
    productRemovedId: number,
    judicialCaseFileId: number
  ) {
    await models.PRODUCT.update(
      { judicialCaseFileId: null },
      {
        where: {
          id: productRemovedId,
          judicial_case_file_id_judicial_case_file: judicialCaseFileId,
        },
      }
    );

    return { id: productRemovedId };
  }

  //INFO: DASHBOARD SECTION
  async getByProductCode(code: string) {
    const product = await models.PRODUCT.findOne({
      where: {
        code,
      },
      include: [
        { model: models.NEGOTIATION, as: "negotiation" },
        {
          model: models.EXT_PRODUCT_NAME,
          as: "extProductName",
          attributes: ["id", "productName", "customerHasBankId"],
        },
        {
          model: models.JUDICIAL_CASE_FILE,
          as: "judicialCaseFile",
          attributes: ["id", "numberCaseFile"],
        },
      ],
    });
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
      await newProduct.reload({
        include: [
          {
            model: models.NEGOTIATION,
            as: "negotiation",
            attributes: ["name", "customerHasBankId"],
          },
          {
            model: models.EXT_PRODUCT_NAME,
            as: "extProductName",
            attributes: ["id", "productName", "customerHasBankId"],
          },
          {
            model: models.JUDICIAL_CASE_FILE,
            as: "judicialCaseFile",
            attributes: ["id", "numberCaseFile"],
          },
        ],
      });
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
