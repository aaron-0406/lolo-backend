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
      include: [
        {
          model: models.CUSTOMER_HAS_BANK,
          as: "customerHasBank",
        },
      ],
      order: [["name", "ASC"]],
    });
    return rta;
  }

  async findOne(id: string) {
    const negotiation = await models.NEGOTIATION.findByPk(id);

    if (!negotiation) {
      throw boom.notFound("Negociación no encontrada");
    }
    return negotiation;
  }

  async create(data: NegotiationType) {
    const newNegotiation = await models.NEGOTIATION.create(data);
    return newNegotiation;
  }

  async update(id: string, changes: NegotiationType) {
    const negotiation = await this.findOne(id);
    const oldNegotiation = { ...negotiation.get() };
    const newNegotiation = await negotiation.update(changes);

    return { oldNegotiation, newNegotiation };
  }

  async delete(id: string) {
    const negotiation = await this.findOne(id);
    const oldNegotiation = { ...negotiation.get() };
    await negotiation.destroy();

    return oldNegotiation;
  }
}

export default NegotiationService;
