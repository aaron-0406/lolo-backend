import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { CustomerType } from "../types/customer.type";
import { createFolder } from "../../../libs/aws_bucket";
import config from "../../../config/config";

const { models } = sequelize;

class CustomerService {
  constructor() {}

  async find() {
    const rta = await models.CUSTOMER.findAll({
      include: ["customerBanks"],
    });
    return rta;
  }

  async findOne(urlIdentifier: string) {
    const customer = await models.CUSTOMER.findOne({
      where: {
        url_identifier: urlIdentifier,
      },
      include: ["customerBanks"],
    });

    if (!customer) {
      throw boom.notFound("Cliente no encontrado");
    }

    if (!customer.dataValues.state) throw boom.notFound("Cliente inhabilitado");

    return customer;
  }

  async findOneByID(id: string) {
    const customer = await models.CUSTOMER.findOne({
      where: {
        id_customer: id,
      },
    });

    if (!customer) {
      throw boom.notFound("Cliente no encontrado");
    }
    return customer;
  }

  async create(data: CustomerType) {
    const newCustomer = await models.CUSTOMER.create(data);
    await createFolder(
      `${config.AWS_PLANTILLA_PATH}${newCustomer.dataValues.id}/`
    );
    return newCustomer;
  }

  async update(id: string, changes: CustomerType) {
    const customer = await this.findOneByID(id);
    const rta = await customer.update(changes);

    return rta;
  }

  async updateState(id: string, state: boolean) {
    const customer = await this.findOneByID(id);
    const rta = await customer.update({ ...customer, state });

    return rta;
  }

  async delete(id: string) {
    const customer = await this.findOneByID(id);
    await customer.destroy();

    return { id };
  }
}

export default CustomerService;
