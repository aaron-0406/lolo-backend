import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ProvinceType } from "../types/province.type";

const { models } = sequelize;

class ProvinceService {
  constructor() {}

  async findAll() {
    const rta = await models.PROVINCE.findAll();

    if (!rta) {
      throw boom.notFound("No existen provincias");
    }

    return rta;
  }

  async findAllByDepartment(departmentId: string) {
    const rta = await models.PROVINCE.findAll({
      where: {
        departmentId,
      },
    });

    if (!rta) {
      throw boom.notFound("No existen provincias");
    }

    return rta;
  }

  async create(data: ProvinceType) {
    const newProvince = await models.PROVINCE.create(data);

    return newProvince;
  }

  async update(id: string, data: ProvinceType) {
    const province = await models.PROVINCE.findByPk(id);

    if (!province) {
      throw boom.notFound("Provincia no encontrada");
    }

    await province.update(data);

    return province;
  }

  async delete(id: string) {
    const province = await models.PROVINCE.findByPk(id);

    if (!province) {
      throw boom.notFound("Provincia no encontrada");
    }

    await province.destroy();

    return { id };
  }
}

export default ProvinceService;