import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { BankType } from "../types/bank.type";

const { models } = sequelize;

class BankService {
  constructor() {}

  async findAll() {
    const rta = await models.BANK.findAll();
    return rta;
  }

  async findOne(id: string) {
    const bank = await models.BANK.findByPk(id);

    if (!bank) {
      throw boom.notFound("Banco no encontrado");
    }
    return bank;
  }

  async create(data: BankType) {
    const bank = await models.BANK.findOne({
      where: {
        name: data.name,
      },
    });

    if (!bank) {
      const newBank = await models.BANK.create(data);
      return newBank;
    }

    throw boom.notFound("Nombre ya registrado");
  }

  async update(id: string, changes: BankType) {
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

export default BankService;
