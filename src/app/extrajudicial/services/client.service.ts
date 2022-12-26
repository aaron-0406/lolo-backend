import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ClientType } from "../types/client.type";

const { models } = sequelize;

class ClientService {
  constructor() {}

  async findAll() {
    const rta = await models.CLIENT.findAll();
    return rta;
  }

  async findAllCHB(chb: string) {
    const rta = await models.CLIENT.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });
    return rta;
  }

  async findCode(code: string, chb: string) {
    const client = await models.CLIENT.findOne({
      where: {
        code: code,
        customer_has_bank_id_customer_has_bank: chb,
      },
    });

    if (!client) {
      throw boom.notFound("Cliente no encontrado");
    }
    return client;
  }

  async create(data: ClientType) {
    const newClient = await models.CLIENT.create(data);
    return newClient;
  }

  async update(code: string, chb: string, changes: ClientType) {
    const client = await this.findCode(code, chb);
    const rta = await client.update(changes);

    return rta;
  }

  async delete(code: string, chb: string) {
    const client = await this.findCode(code, chb);
    await client.destroy();

    return { code };
  }
}

export default ClientService;
