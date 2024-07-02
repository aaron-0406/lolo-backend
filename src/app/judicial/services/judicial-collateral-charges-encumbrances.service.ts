import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialCollateralChargesEncumbrancesType } from "../types/judicial-collateral-charges-encumbrances.type";

const { models } = sequelize;

class JudicialCollateralChargesEncumbrancesService {
  constructor() {}

  async findAllByCollateralId(collateralId: number) {
    try {
      const rta = await models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES.findAll(
        {
          where: {
            judicialCollateralIdJudicialCollateral: collateralId,
          },
          attributes: {
            exclude: [
              "judicialCollateralChargesEncumbrancesTypeLoadId",
              "judicialCollateralChargesEncumbrancesId",
            ],
          },
        }
      );

      if (!rta) {
        throw boom.notFound("Collateral cargas y gravantes no encontradas");
      }
      return rta;
    } catch (error) {
      console.error(error);
    }
  }

  async findByID(id: string) {
    const judicialCollateralChargesEncumbrances =
      await models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: [
            "judicialCollateralChargesEncumbrancesTypeLoadId",
            "judicialCollateralChargesEncumbrancesId",
          ],
        },
      });

    if (!judicialCollateralChargesEncumbrances) {
      throw boom.notFound("Collateral charges encumbrances no encontrado");
    }
    return judicialCollateralChargesEncumbrances;
  }

  async create(data: JudicialCollateralChargesEncumbrancesType) {
    const newJudicialCollateralChargesEncumbrances =
      await models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES.create(data);
    return newJudicialCollateralChargesEncumbrances;
  }

  async update(id: string, changes: JudicialCollateralChargesEncumbrancesType) {
    const judicialCollateralChargesEncumbrances = await this.findByID(id);
    const rta = await judicialCollateralChargesEncumbrances.update(changes);
    return rta;
  }

  async delete(id: string) {
    const judicialCollateralChargesEncumbrances = await this.findByID(id);
    await judicialCollateralChargesEncumbrances.destroy();

    return { id };
  }
}

export default JudicialCollateralChargesEncumbrancesService;
