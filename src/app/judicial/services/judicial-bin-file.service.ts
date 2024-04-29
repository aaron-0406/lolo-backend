import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialBinFileType } from "../types/judicial-bin-file.type";
import { isFileStoredIn } from "../../../libs/helpers";
import path from "path";
import { deleteFileBucket, readFile } from "../../../libs/aws_bucket";
import config from "../../../config/config";

const { models } = sequelize;

class JudicialBinnacleService {
  constructor() {}

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_BIN_FILE.findAll({
      where: { customerHasBankId: chb },
    });
    return rta;
  }

  async findByID(id: string) {
    const judiciaBinFile = await models.JUDICIAL_BIN_FILE.findOne({
      where: {
        id,
      },
    });

    if (!judiciaBinFile) {
      throw boom.notFound("Bitacora Judicial no encontrada");
    }

    return judiciaBinFile;
  }

  async findOne(
    idCustomer: number,
    chb: number,
    code: string,
    judicialFileCaseId: number,
    id: number
  ) {
    const file = await models.JUDICIAL_BIN_FILE.findOne({
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
        `${config.AWS_CHB_PATH}${idCustomer}/${chb}/${code}/case-file/${judicialFileCaseId}/binnacle/${file.dataValues.nameOriginAws}`
      );
    }
    return file;
  }

  async create(data: JudicialBinFileType) {
    const newJudicialBinnacle = await models.JUDICIAL_BIN_FILE.create(data);
    return newJudicialBinnacle;
  }

  async update(id: string, changes: JudicialBinFileType) {
    const judiciaBinFile = await this.findByID(id);
    const rta = await judiciaBinFile.update(changes);
    return rta;
  }

  async delete(
    id: string,
    idCustomer: number,
    chb: number,
    code: string,
    judicialFileCaseId: number
  ) {
    const judiciaBinFile = await this.findByID(id);
    await judiciaBinFile.destroy();
    await deleteFileBucket(
      `${config.AWS_CHB_PATH}${idCustomer}/${chb}/${code}/case-file/${judicialFileCaseId}/binnacle/${judiciaBinFile.dataValues.nameOriginAws}`
    );
    return { id };
  }
}

export default JudicialBinnacleService;
