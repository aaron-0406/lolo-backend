import sequelize from "../../../libs/sequelize";
import { Op } from "sequelize";
import boom from "@hapi/boom";
import { ClientType } from "../types/client.type";
import config from "../../../config/config";
import { createFolder, deleteFileBucket } from "../../../libs/aws_bucket";

const { models } = sequelize;

class ClientService {
  constructor() {}

  async findAll() {
    const rta = await models.CLIENT.findAll();
    return rta;
  }

  async findAllCHB(chb: string) {
    const rta = await models.CLIENT.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });
    return rta;
  }
  async findAllCHBDetails(chb: string) {
    const rta = await models.CLIENT.findAll({
      include: [
        {
          model: models.DIRECTION,
          as: "direction",
        },
        {
          model: models.GUARANTOR,
          as: "guarantor",
        },
      ],
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });
    return rta;
  }

  async findAllBDetailsAndClientsId(ids: number[]) {
    const rta = await models.CLIENT.findAll({
      include: [
        {
          model: models.DIRECTION,
          as: "direction",
        },
        {
          model: models.GUARANTOR,
          as: "guarantor",
        },
      ],
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return rta;
  }

  async findCode(code: string, chb: string) {
    const client = await models.CLIENT.findOne({
      where: {
        code: code,
        customer_has_bank_id_customer_has_bank: chb,
      },
    });

    if (!client) {
      throw boom.notFound("Cliente no encontrado");
    }
    return client;
  }

  async create(data: ClientType, idBank: number) {
    const client = await models.CLIENT.findOne({
      where: {
        code: data.code,
        customer_has_bank_id_customer_has_bank: data.customerHasBankId,
      },
    });

    if (client) throw boom.notFound("Ya existe un cliente con este código");

    const newClient = await models.CLIENT.create(data);

    // CREATE A FOLDER FOR CLIENT
    await createFolder(`${config.AWS_BANK_PATH}${idBank}/${data.code}/`);
    return newClient;
  }

  async update(code: string, chb: string, changes: ClientType) {
    const client = await this.findCode(code, chb);
    const rta = await client.update(changes);

    return rta;
  }

  async delete(code: string, chb: string, idBank: number) {
    const client = await this.findCode(code, chb);
    await client.destroy();
    await deleteFileBucket(
      `${config.AWS_BANK_PATH}${idBank}/${client.dataValues.code}/`
    );
    return { code };
  }
}

export default ClientService;
