import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { FileType } from "../types/file.type";
import { deleteFile } from "../../../libs/helpers";

const { models } = sequelize;

class FileService {
  constructor() {}

  async find() {
    const rta = await models.FILE.findAll();
    return rta;
  }

  async findOne(id: number) {
    const file = await models.FILE.findOne({
      where: {
        clientId: id,
      },
    });

    if (!file) {
      throw boom.notFound("Archivo no encontrado");
    }
    return file;
  }

  async create(data: FileType) {
    const { name, originalName, clientId } = data;
    const newFile = await models.FILE.create({ name, originalName, clientId });
    return newFile;
  }

  async update(id: number, changes: FileType) {
    const file = await this.findOne(id);
    const rta = await file.update(changes);

    return rta;
  }

  async delete(id: number) {
    const file = await models.FILE.findOne({
      where: {
        clientId: id,
      },
    });
    if (!file) return -1;
    const newFile: FileType = JSON.parse(JSON.stringify(file));
    await deleteFile("../public/docs/", newFile.name);
    await file.destroy();
    return { id };
  }
}

export default FileService;
