import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { DepartmentType } from "../types/department.type";

const { models } = sequelize;

class DepartmentService {
  constructor() {}

  async findAll() {
    const rta = await models.DEPARTMENT.findAll();
    if (!rta) {
      throw boom.notFound("No existen departamentos");
    }
    return rta;
  }

  async create(data: Omit<DepartmentType, "id">) {
    const department = await models.DEPARTMENT.create(data);
    return department;
  }

  async update(id: string, data: DepartmentType) {
    const department = await models.DEPARTMENT.findByPk(id);
    if (!department) {
      throw boom.notFound("Departamento no encontrado");
    }
    await department.update(data);
    return department;
  }

  async delete(id: string) {
    const department = await models.DEPARTMENT.findByPk(id);
    if (!department) {
      throw boom.notFound("Departamento no encontrado");
    }
    await department.destroy();
    return { id };
  }
}

export default DepartmentService;
