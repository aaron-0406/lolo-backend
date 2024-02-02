import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { DashIpAddressBankType } from "../types/dash-ip-address-bank.type";

const { models } = sequelize;

class DashIpAddressBankService {
  constructor() {}

  async findAll() {
    const rta = await models.DASH_IP_ADDRESS_BANK.findAll();
    return rta;
  }

  async findByID(id: string) {
    const dashIpAddress = await models.DASH_IP_ADDRESS_BANK.findByPk(id);

    if (!dashIpAddress) {
      throw boom.notFound("Dirección no encontrado");
    }
    return dashIpAddress;
  }

  async findByIP(ip: string) {
    const dashIpAddress = await models.DASH_IP_ADDRESS_BANK.findOne({
      where: {
        ip,
      },
    });

    if (!dashIpAddress) {
      throw boom.notFound("Dirección no encontrado");
    }
    return dashIpAddress;
  }

  async create(data: DashIpAddressBankType) {
    const newDashIpAddress = await models.DASH_IP_ADDRESS_BANK.create(data);
    return newDashIpAddress;
  }

  async update(id: string, changes: DashIpAddressBankType) {
    const dashIpAddress = await this.findByID(id);
    const rta = await dashIpAddress.update(changes);

    return rta;
  }

  async updateState(id: string, state: boolean) {
    const dashIpAddress = await this.findByID(id);
    const rta = await dashIpAddress.update({ ...dashIpAddress, state });

    return rta;
  }

  async delete(id: string) {
    const dashIpAddress = await this.findByID(id);
    await dashIpAddress.destroy();

    return { id };
  }
}

export default DashIpAddressBankService;
