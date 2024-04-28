import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialBinnacleType } from "../types/judicial-binnacle.type";

const { models } = sequelize;

class JudicialBinnacleService {
  constructor() {}

  async findAllByCHBAndFileCase(fileCase: number) {
    const rta = await models.JUDICIAL_BINNACLE.findAll({
      include: [
        {
          model: models.JUDICIAL_BIN_TYPE_BINNACLE,
          as: "binnacleType",
        },
        {
          model: models.JUDICIAL_BIN_PROCEDURAL_STAGE,
          as: "judicialBinProceduralStage",
        },
      ],
      where: {
        judicialFileCaseId: fileCase,
      },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialBinnacle = await models.JUDICIAL_BINNACLE.findOne({
      include: [
        {
          model: models.JUDICIAL_BIN_TYPE_BINNACLE,
          as: "binnacleType",
        },
        {
          model: models.JUDICIAL_BIN_PROCEDURAL_STAGE,
          as: "judicialBinProceduralStage",
        },
      ],
      where: {
        id,
      },
    });

    if (!judicialBinnacle) {
      throw boom.notFound("Bitacora Judicial no encontrada");
    }

    return judicialBinnacle;
  }

  async create(data: JudicialBinnacleType) {
    const newJudicialBinnacle = await models.JUDICIAL_BINNACLE.create(data);
    const binnacle = await this.findByID(newJudicialBinnacle.dataValues.id);
    return binnacle;
  }

  async update(id: string, changes: JudicialBinnacleType) {
    const judicialBinnacle = await this.findByID(id);
    const rta = await judicialBinnacle.update(changes);
    return rta;
  }

  async delete(id: string) {
    const judicialBinnacle = await this.findByID(id);
    await judicialBinnacle.destroy();

    return { id };
  }
}

export default JudicialBinnacleService;
