import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialCollateralType } from "../types/judicial-collateral.type";

const { models } = sequelize;

class JudicialCollateralService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_COLLATERAL.findAll();
    return rta;
  }

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_COLLATERAL.findAll({
      where: { customerHasBankId: chb },
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_COLLATERAL,
          as: "judicialCaseFileHasCollateral",
          attributes: ["id", "judicialCaseFileId", "judicialCollateralId"],
        },
      ],
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialCollateral = await models.JUDICIAL_COLLATERAL.findOne({
      where: {
        id,
      },
    });

    if (!judicialCollateral) {
      throw boom.notFound("Collateral no encontrado");
    }

    return judicialCollateral;
  }

  async create(data: JudicialCollateralType) {
    const newJudicialCollateral = await models.JUDICIAL_COLLATERAL.create(data);
    return newJudicialCollateral;
  }

  async update(id: string, changes: JudicialCollateralType) {
    const judicialCollateral = await this.findByID(id);
    const rta = await judicialCollateral.update(changes);
    await rta.reload({
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_COLLATERAL,
          as: "judicialCaseFileHasCollateral",
          attributes: ["id", "judicialCaseFileId", "judicialCollateralId"],
        },
      ],
    });
    return rta;
  }

  async delete(id: string) {
    const collateral = await this.findByID(id);
    await collateral.destroy();

    return { id };
  }
}

export default JudicialCollateralService;