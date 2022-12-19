import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { CustomerHasBankType } from "../types/customer-has-bank";

const { models } = sequelize;

class CustomerHasBankService {
  constructor() {}

  async findAll() {
    const rta = await models.CUSTOMER_HAS_BANK.findAll();
    return rta;
  }

  async findOne(idCustomer: string, idBank: string) {
    const customerBank = await models.CUSTOMER_HAS_BANK.findOne({
      where: {
        id_customer: idCustomer,
        id_bank: idBank,
      },
    });

    if (!customerBank) {
      throw boom.notFound("Cliente o Banco no encontrado");
    }
    return customerBank;
  }

  async assign(data: CustomerHasBankType) {
    const newCustomerBank = await models.CUSTOMER_HAS_BANK.create(data);
    return newCustomerBank;
  }

  async delete(idCustomer: string, idBank: string) {
    const customerBank = await this.findOne(idCustomer, idBank);
    await customerBank.destroy();

    return { idCustomer, idBank };
  }
}

export default CustomerHasBankService;
