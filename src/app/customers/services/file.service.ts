import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { FileType } from "../types/file.type";
import { deleteFile } from "../../../libs/helpers";
import {
  deleteFileBucket,
  readFile,
  uploadFile,
} from "../../../libs/aws_bucket";
import config from "../../../config/config";

const { models } = sequelize;

type CreateParam = {
  clientId: number;
  code: number;
  idBank: number;
  files: Express.Multer.File[];
};

class FileService {
  constructor() {}

  async find(clientId: number, idBank: number, code: number) {
    const rta = await models.FILE.findAll({
      where: {
        clientId,
      },
    });
    // for (let i = 0; i < rta.length; i++) {
    //   const element = rta[i];
    //   const result = await readFile(
    //     `${config.AWS_BANK_PATH}${idBank}/${code}/${element.dataValues.name}`
    //   );
    //   console.log(result.Body);
    // }
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

  async update(id: number, changes: FileType) {
    const file = await this.findOne(id);
    const rta = await file.update(changes);

    return rta;
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
