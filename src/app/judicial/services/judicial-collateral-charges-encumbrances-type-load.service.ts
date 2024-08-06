import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialCollateralChargesEncumbrancesTypeLoadType } from "../types/judicial-collateral-charges-encumbrances-type-load.type";

const { models } = sequelize;

class JudicialCollateralChargesEncumbrancesTypeLoadService {
  constructor() {}

  async findAll(chb: string) {
    const rta =
      await models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD.findAll({
        where: {
          customer_has_bank_id_customer_has_bank: chb,
        },
      });
    return rta;
  }

  async findByID(id: string) {
    const judicialCollateralChargesEncumbrancesTypeLoad =
      await models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD.findOne({
        where: {
          id,
        },
      });

    if (!judicialCollateralChargesEncumbrancesTypeLoad) {
      throw boom.notFound("Tipo de carga y gravamen no encontrado");
    }
    return judicialCollateralChargesEncumbrancesTypeLoad;
  }

  async create(data: JudicialCollateralChargesEncumbrancesTypeLoadType) {
    const newJudicialCollateralChargesEncumbrancesTypeLoad =
      await models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD.create(
        data
      );
    return newJudicialCollateralChargesEncumbrancesTypeLoad;
  }

  async update(
    id: string,
    changes: JudicialCollateralChargesEncumbrancesTypeLoadType
  ) {
    const judicialCollateralChargesEncumbrancesTypeLoad = await this.findByID(
      id
    );
    const oldJudicialCollateralChargesEncumbrancesTypeLoad = { ...judicialCollateralChargesEncumbrancesTypeLoad.get() };
    const newJudicialCollateralChargesEncumbrancesTypeLoad = await judicialCollateralChargesEncumbrancesTypeLoad.update(
      changes
    );
    return { oldJudicialCollateralChargesEncumbrancesTypeLoad, newJudicialCollateralChargesEncumbrancesTypeLoad };
  }

  async delete(id: string) {
    const judicialCollateralChargesEncumbrancesTypeLoad = await this.findByID(
      id
    );
    const oldJudicialCollateralChargesEncumbrancesTypeLoad = { ...judicialCollateralChargesEncumbrancesTypeLoad.get() };
    await judicialCollateralChargesEncumbrancesTypeLoad.destroy();

    return oldJudicialCollateralChargesEncumbrancesTypeLoad;
  }
}

export default JudicialCollateralChargesEncumbrancesTypeLoadService;
