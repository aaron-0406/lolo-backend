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
      throw boom.notFound("Banco no encontrado");
    }
    return customerBank;
  }

  async findOneByCustomerAndBank(idCustomer: string, idBank: string) {
    const customerBank = await models.CUSTOMER_HAS_BANK.findOne({
      where: {
        customer_id_customer: idCustomer,
        bank_id_bank: idBank,
      },
    });

    if (!customerBank) {
      throw boom.notFound("Cliente o Banco no encontrado");
    }
    return customerBank;
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

    throw boom.notFound("Datos ya registrados");
  }

  async delete(idCustomer: string, idBank: string) {
    const customerBank = await this.findOneByCustomerAndBank(idCustomer, idBank);
    await customerBank.destroy();

    return { idCustomer, idBank };
  }
}

export default CustomerHasBankService;
