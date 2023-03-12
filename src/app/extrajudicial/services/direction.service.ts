import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { DirectionType } from "../types/direction.type";

const { models } = sequelize;

class DirectionService {
  constructor() {}

  async findAll() {
    const rta = await models.DIRECTION.findAll();
    return rta;
  }

  async findAllByClient(clientID: string) {
    const rta = await models.DIRECTION.findAll({
      where: {
        client_id_client: clientID,
      },
    });
    return rta;
  }

  async findByID(id: string) {
    const direction = await models.DIRECTION.findOne({
      where: {
        id_direction: id,
      },
    });

    if (!direction) throw boom.notFound("Dirección no encontrada");
    return direction;
  }

  async create(data: DirectionType) {
    const newDirection = await models.DIRECTION.create(data);
    return newDirection;
  }

  

  async update(id: string, changes: DirectionType) {
    const direction = await this.findByID(id);
    const rta = await direction.update(changes);
    return rta;
  }

  async delete(id: string) {
    const direction = await this.findByID(id);
    await direction.destroy();

    return { id };
  }
}

export default DirectionService;
