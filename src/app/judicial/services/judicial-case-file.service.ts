import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { Op } from "sequelize";
import { JudicialCaseFileType } from "../types/judicial-case-file.type";

const { models } = sequelize;

class JudicialCaseFileService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_CASE_FILE.findAll();
    return rta;
  }

  async findAllByClient(clientId: string) {
    const judicialCaseFile = await models.JUDICIAL_CASE_FILE.findAll({
      where: {
        clientId,
      },
    });

    if (!judicialCaseFile) {
      throw boom.notFound("Expedientes no encontrados");
    }

    return judicialCaseFile;
  }

  async findAllByCHB(chb: string, query: any) {
    const { limit, page, filter } = query;

    //TODO: Improving this code to get the filtered judicial case list
    //TODO: Remove negotiation, funcionario and customer user
    const { negotiations, funcionarios, users, name } = filter;

    const limite = parseInt(limit, 10);
    const pagina = parseInt(page, 10);
    const names = name as string;
    const listNegotiations = JSON.parse(negotiations);
    const listFuncionarios = JSON.parse(funcionarios);
    const listUsers = JSON.parse(users);

    const filters: any = {};
    if (filter !== "" && filter !== undefined) {
      filters.name = { [Op.substring]: names };
    }
    if (listNegotiations.length) {
      filters.negotiation_id_negotiation = { [Op.in]: listNegotiations };
    }
    if (listFuncionarios.length) {
      filters.funcionario_id_funcionario = { [Op.in]: listFuncionarios };
    }
    if (listUsers.length) {
      filters.customer_user_id_customer_user = { [Op.in]: listUsers };
    }

    let filtersWhere: any = {
      customer_has_bank_id: chb,
    };
    if (Object.keys(filters).length > 0) {
      filtersWhere = {
        [Op.or]: [filters],
        customer_has_bank_id: chb,
      };
    }

    const quantity = await models.CLIENT.count({
      where: filtersWhere,
    });

    const clients = await models.CLIENT.findAll({
      include: [
        { model: models.NEGOTIATION, as: "negotiation" },
        {
          model: models.FUNCIONARIO,
          as: "funcionario",
          attributes: { exclude: ["bankId"] },
        },
        {
          model: models.CUSTOMER_USER,
          as: "customerUser",
        },
      ],
      order: [["name", "ASC"]],
      limit: limite,
      offset: (pagina - 1) * limite,
      where: filtersWhere,
    });

    return { clients, quantity };
  }

  async findByID(id: string) {
    const judicialCaseFile = await models.JUDICIAL_CASE_FILE.findOne({
      where: {
        id,
      },
    });

    if (!judicialCaseFile) {
      throw boom.notFound("Expediente no encontrado");
    }

    return judicialCaseFile;
  }

  async findByNumberCaseFile(numberCaseFile: string) {
    const judicialCaseFile = await models.JUDICIAL_CASE_FILE.findOne({
      where: {
        numberCaseFile,
      },
    });

    if (!judicialCaseFile) {
      throw boom.notFound("Expediente no encontrado");
    }
    return judicialCaseFile;
  }

  async create(data: JudicialCaseFileType) {
    const newJudicialCaseFile = await models.JUDICIAL_CASE_FILE.create(data);
    return newJudicialCaseFile;
  }

  async update(id: string, changes: JudicialCaseFileType) {
    const judicialCaseFile = await this.findByID(id);
    const rta = await judicialCaseFile.update(changes);

    return rta;
  }

  async delete(id: string) {
    const client = await this.findByID(id);
    await client.destroy();

    return { id };
  }
}

export default JudicialCaseFileService;
