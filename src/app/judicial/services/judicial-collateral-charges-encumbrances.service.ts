import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialCollateralChargesEncumbrancesType } from "../types/judicial-collateral-charges-encumbrances.type";

const { models } = sequelize;

class JudicialCollateralChargesEncumbrancesService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES.findAll();
    return rta;
  }

  async findByID(id: string) {
    const judicialCollateralChargesEncumbrances = await models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES.findOne({
      where: {
        id,
      },
    });

    if (!judicialCollateralChargesEncumbrances) {
      throw boom.notFound("Collateral charges encumbrances no encontrado");
    }
    return judicialCollateralChargesEncumbrances;
  }

  async create(data: JudicialCollateralChargesEncumbrancesType) {
    const newJudicialCollateralChargesEncumbrances = await models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES.create(data);
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