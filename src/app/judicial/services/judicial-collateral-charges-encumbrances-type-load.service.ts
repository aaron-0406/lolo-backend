import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialCollateralChargesEncumbrancesTypeLoadType } from "../types/judicial-collateral-charges-encumbrances-type-load.type";

const { models } = sequelize;

class JudicialCollateralChargesEncumbrancesTypeLoadService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD.findAll();
    return rta;
  }

  async findByID(id: string) {
    const judicialCollateralChargesEncumbrancesTypeLoad = await models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD.findOne({
      where: {
        id,
      },
    });

    if (!judicialCollateralChargesEncumbrancesTypeLoad) {
      throw boom.notFound("Collateral charges encumbrances type load no encontrado");
    }
    return judicialCollateralChargesEncumbrancesTypeLoad;
  }

  async create(data: JudicialCollateralChargesEncumbrancesTypeLoadType) {
    const newJudicialCollateralChargesEncumbrancesTypeLoad = await models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD.create(data);
    return newJudicialCollateralChargesEncumbrancesTypeLoad;
  }

  async update(id: string, changes: JudicialCollateralChargesEncumbrancesTypeLoadType) {
    const judicialCollateralChargesEncumbrancesTypeLoad = await this.findByID(id);
    const rta = await judicialCollateralChargesEncumbrancesTypeLoad.update(changes);
    return rta;
  }

  async delete(id: string) {
    const judicialCollateralChargesEncumbrancesTypeLoad = await this.findByID(id);
    await judicialCollateralChargesEncumbrancesTypeLoad.destroy();

    return { id };
  }
}

export default JudicialCollateralChargesEncumbrancesTypeLoadService;    