import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";

const { models } = sequelize;

class JudicialCollateralFilesService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_COLLATERAL_FILE.findAll();
    return rta;
  }

  async findByID(id: string) {
    const judicialCollateralFile = await models.JUDICIAL_COLLATERAL_FILE.findOne({
      where: {
        id,
      },
    });

    if (!judicialCollateralFile) {
      throw boom.notFound("Collateral file no encontrado");
    }
    return judicialCollateralFile;
  }

  async create(data: any) {
    const newJudicialCollateralFile = await models.JUDICIAL_COLLATERAL_FILE.create(data);
    return newJudicialCollateralFile;
  }

  async update(id: string, changes: any) {
    const judicialCollateralFile = await this.findByID(id);
    const rta = await judicialCollateralFile.update(changes);
    return rta;
  }

  async delete(id: string) {
    const judicialCollateralFile = await this.findByID(id);
    await judicialCollateralFile.destroy();

    return { id };
  }
}

export default JudicialCollateralFilesService;