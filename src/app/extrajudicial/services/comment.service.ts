import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { CommentType } from "../types/comment.type";
import {
  formatDate,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  restarDias,
  sortDaysByDate,
} from "../../../libs/helpers";
import { Op } from "sequelize";

const { models } = sequelize;

class CommentService {
  constructor() {}

  async findAllByClient(clientID: string) {
    const rta = await models.COMMENT.findAll({
      where: {
        client_id_client: clientID,
      },
      include: [
        {
          model: models.CUSTOMER_USER,
          as: "customerUser",
          attributes: ["name"],
        },
      ],
      order: [["id", "DESC"]],
    });
    return rta;
  }

  async findAllByDate(date: Date) {
    const rta = await models.COMMENT.findAll({
      where: {
        date,
      },
      include: [
        {
          model: models.CLIENT,
          as: "client",
          attributes: ["code", "name", "cityId"],
        },
        {
          model: models.MANAGEMENT_ACTION,
          as: "managementAction",
          attributes: ["id", "codeAction", "nameAction"],
        },
      ],
    });
    return JSON.parse(JSON.stringify(rta));
  }

  async chart(clientID: string) {
    const primerDia = formatDate(getFirstDayOfWeek());
    const ultimoDia = formatDate(getLastDayOfWeek());

    const rta = await models.COMMENT.findAll({
      attributes: [
        [sequelize.literal("DATE(date)"), "fecha"],
        [sequelize.fn("COUNT", sequelize.col("date")), "cantidad"],
      ],
      group: ["date"],
      where: {
        customer_user_id_customer_user: clientID,
        date: {
          [Op.between]: [primerDia, ultimoDia],
        },
      },
    });
    return JSON.parse(JSON.stringify(rta));
  }

  async findByID(id: string) {
    const comment = await models.COMMENT.findOne({
      where: {
        id_comment: id,
      },
      include: [
        {
          model: models.CUSTOMER_USER,
          as: "customerUser",
          attributes: ["name"],
        },
      ],
    });

    if (!comment) {
      throw boom.notFound("Comment no encontrado");
    }
    return comment;
  }

  async create(data: CommentType) {
    const newComment = await models.COMMENT.create(data);
    const commentFound = await this.findByID(newComment.dataValues.id);
    return commentFound;
  }

  async update(id: string, changes: CommentType) {
    const comment = await this.findByID(id);
    const rta = await comment.update(changes);
    const commentFound = await this.findByID(rta.dataValues.id);
    return commentFound;
  }

  async delete(id: string) {
    const comment = await this.findByID(id);
    await comment.destroy();

    return { id };
  }

  async getCommentsGroupByDayWeekly(customerId: number) {
    const primerDia = getFirstDayOfWeek();
    const ultimoDia = getLastDayOfWeek();
    const primerDiaSemanaPasada = restarDias(primerDia, 7);
    const ultimoDiaSemanaPasada = restarDias(ultimoDia, 7);

    const query = `
        SELECT fecha.dia, COALESCE(COUNT(C.id_comment), 0) AS cantidad
        FROM (
          SELECT DATE('${primerDiaSemanaPasada.toISOString()}') + INTERVAL (days.number) DAY AS dia
          FROM (
            SELECT 0 AS number UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
            UNION ALL SELECT 5 UNION ALL SELECT 6
          ) AS days
          WHERE DATE('${primerDiaSemanaPasada.toISOString()}') + INTERVAL (days.number) DAY <= DATE('${ultimoDiaSemanaPasada.toISOString()}')
        ) AS fecha
        LEFT JOIN COMMENT C ON DATE(C.date) = fecha.dia
        INNER JOIN CUSTOMER_USER CU ON CU.id_customer_user = C.customer_user_id_customer_user
        INNER JOIN CUSTOMER CUS ON CUS.id_customer = CU.customer_id_customer
        WHERE CUS.id_customer = ${customerId} 
        GROUP BY fecha.dia
    `;

    const comentariosPorDia: any[] = await sequelize.query(query);
    const diasSemana = [];
    while (primerDiaSemanaPasada <= ultimoDiaSemanaPasada) {
      diasSemana.push({
        dia: primerDiaSemanaPasada.toISOString().slice(0, 10),
        cantidad: 0,
      });
      primerDiaSemanaPasada.setDate(primerDiaSemanaPasada.getDate() + 1);
    }
    const diasFaltantes = diasSemana.filter(
      (dia) => !comentariosPorDia[0].some((r: any) => r.fecha === dia.dia)
    );
    const resultadosFinales = [...comentariosPorDia[0], ...diasFaltantes];
    return sortDaysByDate(resultadosFinales, "dia");
  }

  async getCommentsGroupByGestorWeekly(customerId: number) {
    const primerDia = getFirstDayOfWeek();
    const ultimoDia = getLastDayOfWeek();
    const primerDiaSemanaPasada = restarDias(primerDia, 7);
    const ultimoDiaSemanaPasada = restarDias(ultimoDia, 7);
    const query = `
      SELECT CU.id_customer_user AS id,CU.name AS name, COUNT(C.id_comment) AS cantidad
      FROM COMMENT C
        INNER JOIN CUSTOMER_USER CU ON CU.id_customer_user = C.customer_user_id_customer_user
        INNER JOIN CUSTOMER CUS ON CUS.id_customer = CU.customer_id_customer
      WHERE CUS.id_customer=${customerId} AND
            C.date BETWEEN DATE('${primerDiaSemanaPasada.toISOString()}') AND DATE('${ultimoDiaSemanaPasada.toISOString()}')
      GROUP BY CU.id_customer_user
    `;
    const comentariosPorUsuario = await sequelize.query(query);
    const gestores = await models.CUSTOMER_USER.findAll({
      where: { customerId },
    });

    const newGestores = gestores.map((gestor) => {
      const gestorFound: any = comentariosPorUsuario[0].find(
        (gestor2: any) => gestor2.name === gestor.dataValues.name
      );
      if (gestorFound) {
        return {
          id: gestorFound.id,
          name: gestorFound.name,
          cantidad: gestorFound.cantidad,
        };
      }
      return {
        id: gestor.dataValues.id,
        name: gestor.dataValues.name,
        cantidad: 0,
      };
    });

    return newGestores;
  }

  async getCommentsGroupByBanks(customerId: number) {
    const primerDia = getFirstDayOfWeek();
    const ultimoDia = getLastDayOfWeek();
    const primerDiaSemanaPasada = restarDias(primerDia, 7);
    const ultimoDiaSemanaPasada = restarDias(ultimoDia, 7);
    const query = `
      SELECT  B.id_bank AS id, B.name AS name, COUNT(C.id_comment) AS cantidad
        FROM COMMENT C
        INNER JOIN CLIENT CLI ON CLI.id_client = C.client_id_client
        INNER JOIN CUSTOMER_HAS_BANK CHB ON CLI.customer_has_bank_id_customer_has_bank = CHB.id_customer_has_bank
        INNER JOIN BANK B ON B.id_bank = CHB.bank_id_bank
      WHERE CHB.customer_id_customer=${customerId} 
            AND C.date BETWEEN DATE('${primerDiaSemanaPasada.toISOString()}') AND DATE('${ultimoDiaSemanaPasada.toISOString()}')
      GROUP BY B.id_bank
    `;
    const queryBank = `
      SELECT B.id_bank AS id, B.name AS name
      FROM BANK B
      INNER JOIN CUSTOMER_HAS_BANK CHB ON B.id_bank = CHB.bank_id_bank
      WHERE CHB.customer_id_customer=${customerId}
    `;
    const comentariosPorBanco = await sequelize.query(query);
    const banks = await sequelize.query(queryBank);

    const newBanks = banks[0].map((bank: any) => {
      const bankFound: any = comentariosPorBanco[0].find(
        (bank2: any) => bank2.name === bank.name
      );
      if (bankFound) {
        return {
          id: bankFound.id,
          name: bankFound.name,
          cantidad: bankFound.cantidad,
        };
      }
      return {
        id: bank.id,
        name: bank.name,
        cantidad: 0,
      };
    });

    return newBanks;
  }

  async getCommentsGroupByDayWeeklyUser(
    customerId: number,
    customerUserId: number
  ) {
    const primerDia = getFirstDayOfWeek();
    const ultimoDia = getLastDayOfWeek();
    const primerDiaSemanaPasada = restarDias(primerDia, 7);
    const ultimoDiaSemanaPasada = restarDias(ultimoDia, 7);

    const query = `
        SELECT fecha.dia, COALESCE(COUNT(C.id_comment), 0) AS cantidad
        FROM (
          SELECT DATE('${primerDiaSemanaPasada.toISOString()}') + INTERVAL (days.number) DAY AS dia
          FROM (
            SELECT 0 AS number UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
            UNION ALL SELECT 5 UNION ALL SELECT 6
          ) AS days
          WHERE DATE('${primerDiaSemanaPasada.toISOString()}') + INTERVAL (days.number) DAY <= DATE('${ultimoDiaSemanaPasada.toISOString()}')
        ) AS fecha
        LEFT JOIN COMMENT C ON DATE(C.date) = fecha.dia
        INNER JOIN CUSTOMER_USER CU ON CU.id_customer_user = C.customer_user_id_customer_user
        INNER JOIN CUSTOMER CUS ON CUS.id_customer = CU.customer_id_customer
        WHERE CUS.id_customer = ${customerId} AND CU.id_customer_user = ${customerUserId}
        GROUP BY fecha.dia
    `;

    const comentariosPorDia: any[] = await sequelize.query(query);
    const diasSemana = [];
    while (primerDiaSemanaPasada <= ultimoDiaSemanaPasada) {
      diasSemana.push({
        dia: primerDiaSemanaPasada.toISOString().slice(0, 10),
        cantidad: 0,
      });
      primerDiaSemanaPasada.setDate(primerDiaSemanaPasada.getDate() + 1);
    }
    const diasFaltantes = diasSemana.filter(
      (dia) => !comentariosPorDia[0].some((r: any) => r.fecha === dia.dia)
    );
    const resultadosFinales = [...comentariosPorDia[0], ...diasFaltantes];
    return sortDaysByDate(resultadosFinales, "dia");
  }

  async getCommentsGroupByGestorWeeklyUser(
    customerId: number,
    customerUserId: number
  ) {
    const primerDia = getFirstDayOfWeek();
    const ultimoDia = getLastDayOfWeek();
    const primerDiaSemanaPasada = restarDias(primerDia, 7);
    const ultimoDiaSemanaPasada = restarDias(ultimoDia, 7);
    const query = `
      SELECT CU.id_customer_user AS id,CU.name AS name, COUNT(C.id_comment) AS cantidad
      FROM COMMENT C
        INNER JOIN CUSTOMER_USER CU ON CU.id_customer_user = C.customer_user_id_customer_user
        INNER JOIN CUSTOMER CUS ON CUS.id_customer = CU.customer_id_customer
      WHERE CUS.id_customer=${customerId} AND CU.id_customer_user = ${customerUserId} AND
            C.date BETWEEN DATE('${primerDiaSemanaPasada.toISOString()}') AND DATE('${ultimoDiaSemanaPasada.toISOString()}')
      GROUP BY CU.id_customer_user
    `;
    const comentariosPorUsuario = await sequelize.query(query);

    const gestores = await models.CUSTOMER_USER.findAll({
      where: { customerId,id:customerUserId },
    });

    const newGestores = gestores.map((gestor) => {
      const gestorFound: any = comentariosPorUsuario[0].find(
        (gestor2: any) => gestor2.name === gestor.dataValues.name
      );
      if (gestorFound) {
        return {
          id: gestorFound.id,
          name: gestorFound.name,
          cantidad: gestorFound.cantidad,
        };
      }
      return {
        id: gestor.dataValues.id,
        name: gestor.dataValues.name,
        cantidad: 0,
      };
    });

    return newGestores;
  }

  async getCommentsGroupByBanksUser(
    customerId: number,
    customerUserId: number
  ) {
    const primerDia = getFirstDayOfWeek();
    const ultimoDia = getLastDayOfWeek();
    const primerDiaSemanaPasada = restarDias(primerDia, 7);
    const ultimoDiaSemanaPasada = restarDias(ultimoDia, 7);
    const query = `
      SELECT  B.id_bank AS id, B.name AS name, COUNT(C.id_comment) AS cantidad
        FROM COMMENT C
        INNER JOIN CLIENT CLI ON CLI.id_client = C.client_id_client
        INNER JOIN CUSTOMER_HAS_BANK CHB ON CLI.customer_has_bank_id_customer_has_bank = CHB.id_customer_has_bank
        INNER JOIN BANK B ON B.id_bank = CHB.bank_id_bank
        INNER JOIN CUSTOMER_USER CU ON CU.id_customer_user = C.customer_user_id_customer_user
      WHERE CHB.customer_id_customer=${customerId} 
            AND CU.id_customer_user = ${customerUserId}
            AND C.date BETWEEN DATE('${primerDiaSemanaPasada.toISOString()}') AND DATE('${ultimoDiaSemanaPasada.toISOString()}')
      GROUP BY B.id_bank
    `;
    const queryBank = `
      SELECT B.id_bank AS id, B.name AS name
      FROM BANK B
      INNER JOIN CUSTOMER_HAS_BANK CHB ON B.id_bank = CHB.bank_id_bank
      WHERE CHB.customer_id_customer=${customerId}
    `;
    const comentariosPorBanco = await sequelize.query(query);
    const banks = await sequelize.query(queryBank);

    const newBanks = banks[0].map((bank: any) => {
      const bankFound: any = comentariosPorBanco[0].find(
        (bank2: any) => bank2.name === bank.name
      );
      if (bankFound) {
        return {
          id: bankFound.id,
          name: bankFound.name,
          cantidad: bankFound.cantidad,
        };
      }
      return {
        id: bank.id,
        name: bank.name,
        cantidad: 0,
      };
    });

    return newBanks;
  }
}

export default CommentService;
