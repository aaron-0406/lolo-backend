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
    const { limit, page, courts, proceduralWays, subjects, users } = query;

    const limite = parseInt(limit, 10);
    const pagina = parseInt(page, 10);
    const listCourts = JSON.parse(courts);
    const listProceduralWays = JSON.parse(proceduralWays);
    const listSubjects = JSON.parse(subjects);
    const listUsers = JSON.parse(users);

    const filters: any = {};
    if (listCourts.length) {
      filters.judicial_court_id_judicial_court = { [Op.in]: listCourts };
    }
    if (listProceduralWays.length) {
      filters.judicial_procedural_way_id_judicial_procedural_way = {
        [Op.in]: listProceduralWays,
      };
    }
    if (listSubjects.length) {
      filters.judicial_subject_id_judicial_subject = { [Op.in]: listSubjects };
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

    const quantity = await models.JUDICIAL_CASE_FILE.count({
      where: filtersWhere,
    });

    const caseFiles = await models.JUDICIAL_CASE_FILE.findAll({
      include: [
        {
          model: models.CUSTOMER_USER,
          as: "customerUser",
          attributes: { exclude: ["password"] },
        },
        {
          model: models.JUDICIAL_COURT,
          as: "judicialCourt",
        },
        {
          model: models.JUDICIAL_PROCEDURAL_WAY,
          as: "judicialProceduralWay",
        },
        {
          model: models.JUDICIAL_SUBJECT,
          as: "judicialSubject",
        },
      ],
      limit: limite,
      offset: (pagina - 1) * limite,
      where: filtersWhere,
    });

    return { caseFiles, quantity };
  }

  async findByID(id: string) {
    const judicialCaseFile = await models.JUDICIAL_CASE_FILE.findOne({
      where: {
        id,
      },
      include: [
        {
          model: models.CUSTOMER_USER,
          as: "customerUser",
          attributes: { exclude: ["password"] },
        },
        {
          model: models.JUDICIAL_COURT,
          as: "judicialCourt",
        },
        {
          model: models.JUDICIAL_PROCEDURAL_WAY,
          as: "judicialProceduralWay",
        },
        {
          model: models.JUDICIAL_SUBJECT,
          as: "judicialSubject",
        },
      ],
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
    const judicialCaseFile = await this.findByID(
      newJudicialCaseFile.dataValues.id
    );

    return judicialCaseFile;
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
