import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { CustomerHasBankType } from "../types/customer-has-bank";
import { createFolder } from "../../../libs/aws_bucket";
import config from "../../../config/config";

const { models } = sequelize;

class CustomerHasBankService {
  constructor() {}

  async findAll() {
    const rta = await models.CUSTOMER_HAS_BANK.findAll();
    return rta;
  }

  async findOneById(id: string) {
    const customerBank = await models.CUSTOMER_HAS_BANK.findByPk(id);

    if (!customerBank) {
      throw boom.notFound("CHB no encontrado");
    }

    return customerBank;
  }

  async findAllByCustomerId(customerId: string) {
    const rta = await models.CUSTOMER_HAS_BANK.findAll({
      where: {
        customer_id_customer: customerId,
      },
      include: ["bank"],
    });

    if (!rta) {
      throw boom.notFound("El cliente no tiene bancos asignados");
    }

    return rta;
  }

  async assign(data: CustomerHasBankType) {
    const customerBank = await models.CUSTOMER_HAS_BANK.findOne({
      where: {
        customer_id_customer: data.idCustomer,
        bank_id_bank: data.idBank,
      },
    });

    if (!customerBank) {
      const newCustomerBank = await models.CUSTOMER_HAS_BANK.create(data);
      await createFolder(
        `${config.AWS_CHB_PATH}${newCustomerBank.dataValues.idCustomer}/${newCustomerBank.dataValues.id}/`
      );
      return newCustomerBank;
    }

    throw boom.notFound("Banco ya asignado");
  }

  async revoke(id: string) {
    const customerBank = await this.findOneById(id);

    //TODO: Remove folder of AWS

    await customerBank.destroy();

    return { id };
  }
}

export default CustomerHasBankService;
