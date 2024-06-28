import { Op } from 'sequelize';
import sequelize from "../../../libs/sequelize";
import boom from '@hapi/boom';
import { JudicialCaseFileHasCollateralType } from '../types/judicial-case-file-has-collateral.type';

const { models } = sequelize;

class JudicialCaseFileHasCollateralService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.findAll();
    return rta;
  }

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.findAll({
      where: { customerHasBankId: chb }
    });
    return rta;
  }

  async findAllRelatedCaseFileAssingCollateral(numberCaseFile: string, collateralId:string, chb: number) {
    const codes = numberCaseFile.split("-");
    codes[2] = "%";
    const filterNumberCaseFile = codes.join("-");
    const judicialCaseFile = await models.JUDICIAL_CASE_FILE.findAll({
      include: {
        model: models.CLIENT,
        as: "client",
        attributes: ["id", "name"],
      },
      where: {
        numberCaseFile: {
          [Op.like]: filterNumberCaseFile,
        },
        customer_has_bank_id: chb,
      },
    });

    const judicialCollaterals = await models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.findAll({
      where: {
        judicialCollateralId: collateralId
      }
    });


    if (!judicialCaseFile) {
      throw boom.notFound("Expediente no encontrado");
    }

    const currentCaseFileHasCollaterals = judicialCollaterals.map((collateral) => collateral.dataValues);
    const judicialCaseFiles =  judicialCaseFile.map((judicialCaseFile) => judicialCaseFile.dataValues);

    const judicialCaseFilesWithCollateral = judicialCaseFiles.map((judicialCaseFile) => {
      const collateral = currentCaseFileHasCollaterals.some(
        (currentCaseFileHasCollateral) =>
          currentCaseFileHasCollateral.judicialCaseFileId ===
          judicialCaseFile.id
      );
      if (collateral) {
        return {
          ...judicialCaseFile,
          hasCollateral: true
        }
      }
      return {
        ...judicialCaseFile,
        hasCollateral: false
      };
    });

    return judicialCaseFilesWithCollateral;
  }

  async assingCollateralToCaseFile ( data: JudicialCaseFileHasCollateralType[], collateralId: string) {
    if (!data.length) {
      throw boom.badRequest("La garantía debe estar asignada al menos a un expediente");
    }
    const judicialCollaterals = await models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.findAll({
      where: {
        judicialCollateralId: collateralId,
        deletedAt: null
      }
    });


    const currentJudicialCaseFileHasCollaterals = judicialCollaterals.map(
      (judicialCollateral) => judicialCollateral.dataValues
    );

    // JudicialCaseFilesHasCollaterals

    const JudicialCaseFileHasCollateralsToDelete = currentJudicialCaseFileHasCollaterals.filter(
      (currentCollateral) =>
        !data.some(
          (collateral) =>
            collateral.judicialCaseFileId ===
            currentCollateral.judicialCaseFileId
        )
    );


    const JudicialCaseFileHasCollateralsToCreate = data.filter(
      (collateral) =>
        !currentJudicialCaseFileHasCollaterals.some(
          (currentCollateral) =>
            currentCollateral.judicialCaseFileId ===
            collateral.judicialCaseFileId
        )
    );

    try {
      for (const collateral of JudicialCaseFileHasCollateralsToDelete) {
        await models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.destroy({
          where: { judicialCaseFileId: collateral.judicialCaseFileId,
            judicialCollateralId: collateralId

          },
        });
      }

      for (const newCollateral of JudicialCaseFileHasCollateralsToCreate) {
        await models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.create(newCollateral);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

}

export default JudicialCaseFileHasCollateralService;