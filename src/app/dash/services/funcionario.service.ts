import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { FuncionarioType } from "../types/funcionario.type";

const { models } = sequelize;

class FuncionarioService {
  constructor() {}

  async findAll() {
    const rta = await models.FUNCIONARIO.findAll({
      attributes: { exclude: ["bankId"] },
    });
    return rta;
  }

  async findAllByCHB(chb: string) {
    const rta = await models.FUNCIONARIO.findAll({
      attributes: { exclude: ["bankId"] },
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });
    return rta;
  }

  async findOne(id: string) {
    const funcionario = await models.FUNCIONARIO.findByPk(id, {
      attributes: { exclude: ["bankId"] },
    });

    if (!funcionario) {
      throw boom.notFound("Funcionario no encontrado");
    }
    return funcionario;
  }

  async create(data: FuncionarioType) {
    const newFuncionario = await models.FUNCIONARIO.create(data);
    return newFuncionario;
  }

  async update(id: string, changes: FuncionarioType) {
    const funcionario = await this.findOne(id);
    const oldFuncionario = { ...funcionario.get() };
    const newFuncionario = await funcionario.update(changes);

    return { oldFuncionario, newFuncionario };
  }

  async delete(id: string) {
    const funcionario = await this.findOne(id);
    const oldFuncionario = { ...funcionario.get() };
    await funcionario.destroy();

    return oldFuncionario;
  }
}

export default FuncionarioService;
