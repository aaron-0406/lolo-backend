import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { Op, FindOptions, Model, ModelCtor } from 'sequelize';
import { JudicialCaseFileType } from "../types/judicial-case-file.type";
import { JudicialCasefileProcessStatus } from "../types/judicial-case-file-process-status.type";
import { toDataURL } from "qrcode";

const { models } = sequelize;
type OrderItem = [string, 'ASC' | 'DESC'];
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
    const { limit, page, filter, courts, sedes, proceduralWays, subjects, users, sortBy, order } =
      query;

    const limite = parseInt(limit, 10);
    const pagina = parseInt(page, 10);
    const clientName = filter as string;
    const listCourts = JSON.parse(courts);
    const listProceduralWays = JSON.parse(proceduralWays);
    const listSubjects = JSON.parse(subjects);
    const listUsers = JSON.parse(users);
    const listSedes = JSON.parse(sedes);
    const sortByField = sortBy as string;

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
    if (listSedes.length) {
      filters.judicial_sede_id_judicial_sede = { [Op.in]: listSedes };
    }

    let sortField: string;
    let orderConfig: FindOptions<any>['order'];
    let model: ModelCtor<Model<any, any>> | undefined;


    if (sortBy && order) {
      switch (sortByField) {
        case 'CLIENTE':
          sortField = 'name';
          model = models.CLIENT;
          break;
        case 'judicialCourt':
          sortField = 'name';
          model = models.JUDICIAL_COURT;
          break;
        case 'proceduralWay':
          sortField = 'name';
          model = models.JUDICIAL_PROCEDURAL_WAY;
          break
        default:
          sortField = 'createdAt';
          model = undefined;
      }

      if (model) {
        orderConfig = [[{ model, as: model.name.toLowerCase() }, sortField, order as 'ASC' | 'DESC']];
      } else {
        orderConfig = [[sortField, order as 'ASC' | 'DESC']];
      }
    } else {
      orderConfig = undefined;
    }

    let filtersWhere: any = {
      [Op.or]: [
        { customer_has_bank_id: chb },
        { chb_transferred: chb },
      ],
      id_judicial_case_file_related: null,
    };

    // Agregar filtro por nombre de cliente si se proporciona
    if (clientName) {
      filtersWhere = {
        ...filtersWhere,
        "$client.name$": { [Op.like]: `%${clientName}%` }, // Filtrar por nombre de cliente (parcialmente coincidente)
      };
    }

    // Combinar filtros adicionales si se proporcionan
    if (Object.keys(filters).length > 0) {
      filtersWhere = {
        [Op.and]: [{ [Op.or]: [filters] }, filtersWhere],
      };
    }

    try {
      const quantity = await models.JUDICIAL_CASE_FILE.count({
        include: [
          { model: models.CLIENT, as: "client" },
        ],
        where: filtersWhere,
      });

      const caseFiles = await models.JUDICIAL_CASE_FILE.findAll({
        include: [
          {
            model: models.CUSTOMER_USER,
            as: "customerUser",
            attributes: ["id", "name"],
          },
          { model: models.JUDICIAL_COURT, as: "judicialCourt" },
          {
            model: models.JUDICIAL_PROCEDURAL_WAY,
            as: "judicialProceduralWay",
          },
          { model: models.JUDICIAL_SUBJECT, as: "judicialSubject" },
          { model: models.JUDICIAL_SEDE, as: "judicialSede" },
          { model: models.CITY, as: "city" },
          { model: models.CLIENT, as: "client", attributes: ["id", "name"] },
        ],
        limit: limite,
        offset: (pagina - 1) * limite,
        where: filtersWhere,
        order: orderConfig, // Orden configurado dinámicamente según sortBy y order
      });

      return { caseFiles, quantity };
    } catch (error) {
      console.error("Error en findAllByCHB:", error);
      throw boom.badImplementation("Error al consultar los expedientes");
    }
  }
  // Métodos adicionales del servicio aquí...
  async existNumberCaseFile(customerId: string, numberCaseFile: string) {
    const judicialCaseFile = await models.JUDICIAL_CASE_FILE.findOne({
      where: {
        number_case_file: numberCaseFile,
      },
    });

    if (!judicialCaseFile) {
      return false;
    }

    const customerHasBank = await models.CUSTOMER_HAS_BANK.findOne({
      where: {
        id_customer_has_bank: judicialCaseFile?.dataValues.customerHasBankId,
      },
    });

    if (!customerHasBank) {
      return false;
    }

    if (customerId == customerHasBank.dataValues.idCustomer) {
      return true;
    } else {
      return false;
    }
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
          attributes: ["id", "name"],
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
        {
          model: models.JUDICIAL_SEDE,
          as: "judicialSede",
        },
        {
          model: models.CITY,
          as: "city",
        },
        {
          model: models.CLIENT,
          as: "client",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!judicialCaseFile) {
      throw boom.notFound("Expediente no encontrado");
    }

    return judicialCaseFile;
  }

  async findByNumberCaseFile(numberCaseFile: string, chb: number) {
    const judicialCaseFile = await models.JUDICIAL_CASE_FILE.findOne({
      include: [

        {
          model: models.CLIENT,
          as: "client",
          include: [
            {
              model: models.CUSTOMER_USER,
              as: "customerUser",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: models.JUDICIAL_CASE_FILE,
          as: "relatedJudicialCaseFile",
          attributes: ["numberCaseFile"],
        }
      ],

      where: {
        numberCaseFile,
        [Op.or]: [
          { customer_has_bank_id: chb },
          { chb_transferred: chb },
        ],
      },
    });

    if (!judicialCaseFile) {
      throw boom.notFound("Expediente no encontrado");
    }
    return judicialCaseFile;
  }

  async findRelatedNumberCaseFile(numberCaseFile: string, chb: number) {
    const codes = numberCaseFile.split("-");
    codes[2] = "%";
    const filterNumberCaseFile = codes.join("-");

    const judicialCaseFile = await models.JUDICIAL_CASE_FILE.findAll({
      include: {
        model: models.CLIENT,
        as: "client",
        include: [
          {
            model: models.CUSTOMER_USER,
            as: "customerUser",
            attributes: ["id", "name"],
          },
        ],
      },
      where: {
        numberCaseFile: {
          [Op.like]: filterNumberCaseFile,
        },
        customer_has_bank_id: chb,
      },
    });

    if (!judicialCaseFile) {
      throw boom.notFound("Expediente no encontrado");
    }
    return judicialCaseFile;
  }

  async create(data: JudicialCaseFileType, customerId: string) {
    const existCaseFile = await this.existNumberCaseFile(
      customerId,
      data.numberCaseFile
    );

    if (!existCaseFile) {
      const newJudicialCaseFile = await models.JUDICIAL_CASE_FILE.create(data);
      const judicialCaseFile = await this.findByID(
        newJudicialCaseFile.dataValues.id
      );

      return judicialCaseFile;
    } else {
      throw boom.notFound("Ya existe un expediente con este código");
    }
  }

  async update(id: string, changes: JudicialCaseFileType) {
    const judicialCaseFile = await this.findByID(id);
    const rta = await judicialCaseFile.update(changes);
    return rta;
  }

  async updateProcessStatus(
    id: string,
    changes: JudicialCasefileProcessStatus
  ) {
    const judicialCaseFile = await this.findByID(id);
    const rta = await judicialCaseFile.update(changes);
    return rta;
  }

  async delete(id: string) {
    const client = await this.findByID(id);
    await client.destroy();

    return { id };
  }

  async createQrCode(numberCaseFile: string, chb: number) {
    try {
      const qrCodeImg64 = await toDataURL(numberCaseFile, { version: 2 });

      const judicialCaseFile = await models.JUDICIAL_CASE_FILE.findOne({
        where: {
          numberCaseFile,
          customerHasBankId: chb,
        },
      });
      if (!judicialCaseFile) return boom.notFound("Expediente no encontrado");
      await judicialCaseFile.update({ qrCode: qrCodeImg64 });
      return qrCodeImg64;
    } catch (err) {
      throw boom.badRequest("Error al generar el código QR");
    }
  }
}

export default JudicialCaseFileService;
