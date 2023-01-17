import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { NegotiationType } from "../types/negotiation.type";

const { models } = sequelize;

class NegotiationService {
  constructor() {}

  async findAll() {
    const rta = await models.NEGOTIATION.findAll();
    return rta;
  }

  async findAllByCHB(chb: string) {
    const rta = await models.NEGOTIATION.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });
    return rta;
  }

  async findOne(id: string) {
    const bank = await models.NEGOTIATION.findByPk(id);

    if (!bank) {
      throw boom.notFound("Negociación no encontrada");
    }
    return bank;
  }

  async create(data: NegotiationType) {
    const newNegotiation = await models.NEGOTIATION.create(data);
    return newNegotiation;
  }

  async update(id: string, changes: NegotiationType) {
    const bank = await this.findOne(id);
    const rta = await bank.update(changes);

    return rta;
  }

  async delete(id: string) {
    const bank = await this.findOne(id);
    await bank.destroy();

    return { id };
  }
}

export default NegotiationService;
