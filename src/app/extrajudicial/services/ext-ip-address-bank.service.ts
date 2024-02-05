import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ExtIpAddressBankType } from "../types/ext-ip-address-bank.type";

const { models } = sequelize;

class ExtIpAddressBankService {
  constructor() {}

  async findAll() {
    const rta = await models.EXT_IP_ADDRESS_BANK.findAll();
    return rta;
  }

  async findByID(id: string) {
    const extIpAddress = await models.EXT_IP_ADDRESS_BANK.findByPk(id);

    if (!extIpAddress) {
      throw boom.notFound("Dirección no encontrado");
    }
    return extIpAddress;
  }

  async findByIP(ip: string) {
    const extIpAddress = await models.EXT_IP_ADDRESS_BANK.findOne({
      where: {
        ip,
      },
    });

    if (!extIpAddress) {
      throw boom.notFound("Dirección no encontrado");
    }
    return extIpAddress;
  }

  async create(data: ExtIpAddressBankType) {
    const newExtIpAddress = await models.EXT_IP_ADDRESS_BANK.create(data);
    return newExtIpAddress;
  }

  async update(id: string, changes: ExtIpAddressBankType) {
    const extIpAddress = await this.findByID(id);
    const rta = await extIpAddress.update(changes);

    return rta;
  }

  async updateState(id: string, state: boolean) {
    const extIpAddress = await this.findByID(id);
    const rta = await extIpAddress.update({ ...extIpAddress, state });

    return rta;
  }

  async delete(id: string) {
    const extIpAddress = await this.findByID(id);
    await extIpAddress.destroy();

    return { id };
  }
}

export default ExtIpAddressBankService;
