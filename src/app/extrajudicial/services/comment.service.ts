import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { CommentType } from "../types/comment.type";
import { formatDate } from "../../../libs/helpers";
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
  async chart(clientID: string) {
    const hoy = new Date();

    const primerDia = formatDate(
      new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 1))
    );

    const ultimoDia = formatDate(
      new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 7))
    );

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
}

export default CommentService;
