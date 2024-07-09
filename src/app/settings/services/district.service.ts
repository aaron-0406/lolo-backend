import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { DistrictType } from "../types/district.type";

const { models } = sequelize;

class DistrictService {
  constructor() {}
  async findAll() {
    const rta = await models.DISTRICT.findAll();
    if (!rta) {
      throw boom.notFound("No existen distritos");
    }
    return rta;
  }

  async findAllByProvince(provinceId: string) {
    const rta = await models.DISTRICT.findAll({
      where: {
        provinceId,
      },
    });
    if (!rta) {
      throw boom.notFound("No existen distritos");
    }
    return rta;
  }

  async create(data: DistrictType) {
    const newDistrict = await models.DISTRICT.create(data);
    return newDistrict;
  }

  async update(id: string, data: DistrictType) {
    const district = await models.DISTRICT.findByPk(id);
    if (!district) {
      throw boom.notFound("Distrito no encontrado");
    }
    await district.update(data);
    return district;
  }

  async delete(id: string) {
    const district = await models.DISTRICT.findByPk(id);
    if (!district) {
      throw boom.notFound("Distrito no encontrado");
    }
    await district.destroy();
    return { id };
  }
}

export default DistrictService;
