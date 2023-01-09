import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { CommentType } from "../types/comment.type";

const { models } = sequelize;

class CommentService {
  constructor() {}

  async findAllByClient(clientID: string) {
    const rta = await models.COMMENT.findAll({
      where: {
        client_id_client: clientID,
      },
      order: [["id", "DESC"]],
    });
    return rta;
  }

  async findByID(id: string) {
    const comment = await models.COMMENT.findOne({
      where: {
        id_comment: id,
      },
    });

    if (!comment) {
      throw boom.notFound("Comment no encontrado");
    }
    return comment;
  }

  async create(data: CommentType) {
    const newComment = await models.COMMENT.create(data);
    return newComment;
  }

  async update(id: string, changes: CommentType) {
    const comment = await this.findByID(id);
    const rta = await comment.update(changes);

    return rta;
  }

  async delete(id: string) {
    const comment = await this.findByID(id);
    await comment.destroy();

    return { id };
  }
}

export default CommentService;
