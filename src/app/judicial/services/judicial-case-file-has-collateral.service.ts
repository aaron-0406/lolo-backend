import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialCaseFileHasCollateralType } from "../types/judicial-case-file-has-collateral.type";

const { models } = sequelize;

class JudicialCaseFileHasCollateralService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.findAll();
    return rta;
  }

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.findAll({
      where: { customerHasBankId: chb },
      include: [
        {
          model: models.JUDICIAL_CASE_FILE,
          as: "judicialCaseFile",
          attributes: ["id", "judicialCaseId", "judicialCollateralId"],
        },
      ],
    });
    return rta;
  }


  async create ( data: JudicialCaseFileHasCollateralType) {
    const newJudicialCaseFileHasCollateral = await models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.create(data);
    return newJudicialCaseFileHasCollateral;
  }
}

export default JudicialCaseFileHasCollateralService;