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

  async findCode(code: string) {
    const client = await models.CLIENT.findOne({
      where: {
        code: code,
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

  async update(code: string, changes: ClientType) {
    const client = await this.findCode(code);
    const rta = await client.update(changes);

    return rta;
  }

  async delete(code: string) {
    const client = await this.findCode(code);
    await client.destroy();

    return { code };
  }
}

export default ClientService;
