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
    const rta = await funcionario.update(changes);

    return rta;
  }

  async delete(id: string) {
    const funcionario = await this.findOne(id);
    await funcionario.destroy();

    return { id };
  }
}

export default FuncionarioService;
