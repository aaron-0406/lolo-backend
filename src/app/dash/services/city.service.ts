import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { CityType } from "../types/city.type";

const { models } = sequelize;

class CityService {
  constructor() {}

  async findAll(chb: number) {
    console.log("rta");
    const rta = await models.CITY.findAll({
      where: {
        customer_has_bank_id: chb,
      },
    });
    return rta;
  }

  async findOne(id: string) {
    const city = await models.CITY.findByPk(id);

    if (!city) {
      throw boom.notFound("Ciudad no encontrada");
    }
    return city;
  }

  async create(data: CityType) {
    const newCity = await models.CITY.create(data);
    return newCity;
  }

  async update(id: string, changes: CityType) {
    const city = await this.findOne(id);
    const rta = await city.update(changes);

    return rta;
  }

  async delete(id: string) {
    const city = await this.findOne(id);
    await city.destroy();

    return { id };
  }
}

export default CityService;
