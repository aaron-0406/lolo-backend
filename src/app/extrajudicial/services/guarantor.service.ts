import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { GuarantorType } from "../types/guarantor.type";

const { models } = sequelize;

class GuarantorService {
  constructor() {}

  async findAll() {
    const rta = await models.GUARANTOR.findAll();
    return rta;
  }

  async findAllClient(clientID: string) {
    const rta = await models.GUARANTOR.findAll({
      where: {
        client_id_client: clientID,
      },
    });
    return rta;
  }

  async findID(id: string) {
    const guarantor = await models.GUARANTOR.findOne({
      where: {
        id_guarantor: id,
      },
    });

    if (!guarantor) {
      throw boom.notFound("Guarantor no encontrado");
    }
    return guarantor;
  }

  async create(data: GuarantorType) {
    const newGuarantor = await models.GUARANTOR.create(data);
    return newGuarantor;
  }

  async update(id: string, changes: GuarantorType) {
    const guarantor = await this.findID(id);
    const rta = await guarantor.update(changes);

    return rta;
  }

  async delete(id: string) {
    const client = await this.findID(id);
    await client.destroy();

    return { id };
  }
}

export default GuarantorService;
