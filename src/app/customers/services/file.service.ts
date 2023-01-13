import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { FileType } from "../types/file.type";
import { deleteFile, isFileStoredIn } from "../../../libs/helpers";
import {
  deleteFileBucket,
  readFile,
  uploadFile,
} from "../../../libs/aws_bucket";
import config from "../../../config/config";
import path from "path";

const { models } = sequelize;

type CreateParam = {
  clientId: number;
  code: number;
  idBank: number;
  files: Express.Multer.File[];
};

class FileService {
  constructor() {}

  async find(clientId: number) {
    const rta = await models.FILE.findAll({
      where: {
        clientId,
      },
    });
    return rta;
  }

  async findOne(id: number, idBank: number, code: number) {
    const file = await models.FILE.findOne({
      where: {
        id,
      },
    });

    if (!file) {
      throw boom.notFound("Archivo no encontrado");
    }

    const isStored = isFileStoredIn(
      path.join(__dirname, "../../../public/download"),
      file.dataValues.name
    );

    if (!isStored) {
      await readFile(
        `${config.AWS_BANK_PATH}${idBank}/${code}/${file.dataValues.name}`
      );
    }
    return file;
  }

  async create(data: CreateParam) {
    const { clientId, code, idBank } = data;
    // console.log(data);
    const filesAdded = [];
    for (let i = 0; i < data.files.length; i++) {
      const { filename, originalname } = data.files[i];

      // STORED IN DATABASE
      const newFile = await models.FILE.create({
        name: filename,
        originalName: originalname,
        clientId,
      });

      // UPLOAD TO AWS
      await uploadFile(
        data.files[i],
        `${config.AWS_BANK_PATH}${idBank}/${code}`
      );

      // DELETE TEMP FILE
      await deleteFile("../public/docs", filename);
      filesAdded.push(newFile);
    }
    return filesAdded;
  }

  async delete(idBank: number, code: number, id: number) {
    const file = await models.FILE.findOne({
      where: {
        id,
      },
    });
    if (!file) return -1;
    const newFile: FileType = JSON.parse(JSON.stringify(file));
    await file.destroy();
    await deleteFileBucket(
      `${config.AWS_BANK_PATH}${idBank}/${code}/${newFile.name}`
    );
    return { id };
  }
}

export default FileService;
