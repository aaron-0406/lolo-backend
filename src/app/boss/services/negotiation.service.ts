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

  async findAllOpts(query: any) {
    const { limit, page } = query;
    const limite = parseInt(limit, 10);
    const pagina = parseInt(page, 10);

    const rta = await models.NEGOTIATION.findAll({
      order: [["name", "ASC"]],
      limit: limite,
      offset: (pagina - 1) * limite,
    });

    const quantity = await models.NEGOTIATION.count({});

    return { rta, quantity };
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
    const rta = await negotiation.update(changes);

    return rta;
  }

  async delete(id: string) {
    const negotiation = await this.findOne(id);
    await negotiation.destroy();

    return { id };
  }
}

export default NegotiationService;
