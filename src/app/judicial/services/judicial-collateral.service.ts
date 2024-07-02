import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialCollateralType } from "../types/judicial-collateral.type";

const { models } = sequelize;
class JudicialCollateralService {
  constructor() {}

  async findAllCollateralByCaseFile (judicialCaseFileId: string) {
    const rta = await models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.findAll({
      where: { judicialCaseFileId },
      include: [
        {
          model: models.JUDICIAL_COLLATERAL,
          as: "judicialCollateral",
          where: {
            deletedAt: null,
          }
        },
      ],
    });

    const collaterals = rta.map((item) => item.dataValues.judicialCollateral);
    return collaterals;
  }

  async findByID(id: string) {
    const judicialCollateral = await models.JUDICIAL_COLLATERAL.findOne({
      where: {
        id,
      },
      include:[
        {
          model:models.JUDICIAL_USE_OF_PROPERTY,
          as: "useOfProperty",
          attributes: ["id", "name"],
        },
        {
          model:models.JUDICIAL_REGISTRATION_AREA,
          as: "registrationArea",
          attributes: ["id", "name"],
        },
        {
          model:models.JUDICIAL_NOTARY,
          as: "notary",
          attributes: ["id", "name"],
        },
        {
          model:models.JUDICIAL_REGISTER_OFFICE,
          as: "registerOffice",
          attributes: ["id", "name"],
        },
        {
          model:models.DEPARTMENT,
          as: "department",
          attributes: ["id", "name"],

        },
        {
          model:models.PROVINCE,
          as: "province",
          attributes: ["id", "name"],
        },
        {
          model:models.DISTRICT,
          as: "district",
          attributes: ["id", "name"],
        },

      ]
    });

    if (!judicialCollateral) {
      throw boom.notFound("Collateral no encontrado");
    }
    return judicialCollateral;
  }


  async create(data: JudicialCollateralType, judicialCaseFileid: string) {
    const newJudicialCollateral = await models.JUDICIAL_COLLATERAL.create(data);

    if (newJudicialCollateral) await models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.create({
      judicialCollateralId: newJudicialCollateral.dataValues.id,
      judicialCaseFileId: judicialCaseFileid,
    });

    return newJudicialCollateral;
  }

  async update(id: string, changes: JudicialCollateralType) {
    const judicialCollateral = await this.findByID(id);
    const rta = await judicialCollateral.update(changes);
    return rta;
  }

  async delete(id: string) {
    const collateral = await this.findByID(id);
    await collateral.destroy();

    return { id };
  }
}

export default JudicialCollateralService;