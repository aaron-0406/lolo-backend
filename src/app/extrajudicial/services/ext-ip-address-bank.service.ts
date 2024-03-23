import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { ExtIpAddressBankType } from "../types/ext-ip-address-bank.type";

const { models } = sequelize;

class ExtIpAddressBankService {
  constructor() {}

  async findAllByCustomerId(customerId: string) {
    const rta = await models.EXT_IP_ADDRESS_BANK.findAll({
      where: {
        customer_id_customer: customerId,
      },
    });
    return rta;
  }

  async findByID(id: string, customerId: string) {
    const extIpAddress = await models.EXT_IP_ADDRESS_BANK.findOne({
      where: {
        id,
        customer_id_customer: customerId,
      },
    });

    if (!extIpAddress) {
      throw boom.notFound("Dirección de IP no encontrada");
    }

    return extIpAddress;
  }

  async findByIP(ip: string, customerId: string) {
    const extIpAddress = await models.EXT_IP_ADDRESS_BANK.findOne({
      where: {
        ip,
        customer_id_customer: customerId,
      },
    });

    if (!extIpAddress) {
      throw boom.notFound("IP no encontrada");
    }
    return extIpAddress;
  }

  async create(data: ExtIpAddressBankType) {
    const newExtIpAddress = await models.EXT_IP_ADDRESS_BANK.create(data);
    return newExtIpAddress;
  }

  async update(id: string, changes: ExtIpAddressBankType) {
    const extIpAddress = await this.findByID(id, String(changes.customerId));
    const rta = await extIpAddress.update(changes);

    return rta;
  }

  async updateState(id: string, customerId: string, state: boolean) {
    const extIpAddress = await this.findByID(id, customerId);
    const rta = await extIpAddress.update({ ...extIpAddress, state });

    return rta;
  }

  async delete(id: string, customerId: string) {
    const extIpAddress = await this.findByID(id, customerId);
    await extIpAddress.destroy();

    return { id };
  }
}

export default ExtIpAddressBankService;
