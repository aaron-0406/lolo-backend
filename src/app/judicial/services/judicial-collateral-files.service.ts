import path from "path";
import config from "../../../config/config";
import { deleteFileBucket, readFile, uploadFile } from "../../../libs/aws_bucket";
import { deleteFile, isFileStoredIn, renameFile } from "../../../libs/helpers";
import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";

const { models } = sequelize;

class JudicialCollateralFilesService {
  constructor() {}

  async findByID(id: string) {
    const judicialCollateralFile =
      await models.JUDICIAL_COLLATERAL_FILE.findOne({
        where: {
          id,
        },
      });

    if (!judicialCollateralFile) {
      throw boom.notFound("Collateral file no encontrado");
    }
    return judicialCollateralFile;
  }

  async findOne(
    chb: number,
    collateralId: number,
    id: number
  ){
    try{
      const file = await models.JUDICIAL_COLLATERAL_FILES.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["judicialCollateralId"]
        }
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
          `${config.AWS_CHB_PATH}${chb}/collaterals/${collateralId}/${file.dataValues.nameOriginAws}`
        );
      }
      return file;

    } catch(error){
      console.log(error);
    }
  }

  async findAllByCollateralId(collateralId: number, chb: number) {
    try{
      const judicialCollateralFile = await models.JUDICIAL_COLLATERAL_FILES.findAll({
        where: {
          judicialCollateralIdJudicialCollateral: collateralId,
          customerHasBankId: chb,
        },
        attributes:{
          exclude: ["judicialCollateralId"]
        }
      });
      if (!judicialCollateralFile) {
        throw boom.notFound("Collateral file no encontrado");
      }
      return judicialCollateralFile;
    } catch(error){
      console.log(error);
    }
  }

  async create(
    files: Array<any>,
    chb: number,
    collateralId: number,
  ) {
    try {
      const filesData = await Promise.all(files.map(async (file) => {
        const newJudicialCollateralFile = await models.JUDICIAL_COLLATERAL_FILES.create({
          originalName: file.originalname,
          nameOriginAws: "",
          judicialCollateralIdJudicialCollateral: collateralId,
          customerHasBankId: chb,
        });
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const nameOriginAws = `${collateralId}-${month}-${year}-${file.originalname}`;
        await renameFile(`../public/docs/`, file.filename, nameOriginAws);
        file.filename = nameOriginAws;

        await uploadFile(
          file,
          `${config.AWS_CHB_PATH}${chb}/collaterals/${collateralId}`
        );

        // UPDATE NAME IN DATABASE
        await newJudicialCollateralFile.update({
          nameOriginAws: file.filename,
        });

        const judicialCollateralFile = await models.JUDICIAL_COLLATERAL_FILES.findOne({
          where: {
            id: newJudicialCollateralFile.dataValues.id,
          },
          attributes: {
            exclude: ["judicialCollateralId"],
          },
        });

        // DELETE TEMP FILE
        await deleteFile("../public/docs", file.filename);

        return judicialCollateralFile;
      }));
      return filesData;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string, chb: number, collateralId: number) {
    try {
      const judicialCollateralFile = await models.JUDICIAL_COLLATERAL_FILES.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["judicialCollateralId"],
        }
      });
      if (!judicialCollateralFile) throw boom.notFound("Archivo no encontrado");
      await judicialCollateralFile.destroy();
      await deleteFileBucket(
        `${config.AWS_CHB_PATH}${chb}/collaterals/${collateralId}/${judicialCollateralFile.dataValues.nameOriginAws}`
      );
      return { id };
    } catch (error) {
      console.log(error);
    }
  }
}

export default JudicialCollateralFilesService;