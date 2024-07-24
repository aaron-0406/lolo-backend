import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialBinProceduralStageType } from "../types/judicial-bin-procedural-stage.type";

const { models } = sequelize;

class JudicialBinProceduralStageService {
  constructor() {}

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_BIN_PROCEDURAL_STAGE.findAll({
      where: { customerHasBankId: chb },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialBinProceduralStage =
      await models.JUDICIAL_BIN_PROCEDURAL_STAGE.findOne({
        where: {
          id,
        },
      });

    if (!judicialBinProceduralStage) {
      throw boom.notFound("Etapa Procesal no encontrada");
    }

    return judicialBinProceduralStage;
  }

  async create(data: JudicialBinProceduralStageType) {
    const newJudicialBinProceduralStage =
      await models.JUDICIAL_BIN_PROCEDURAL_STAGE.create(data);
    return newJudicialBinProceduralStage;
  }

  async update(id: string, changes: JudicialBinProceduralStageType) {
    const judicialBinProceduralStage = await this.findByID(id);
    const oldData = {...judicialBinProceduralStage.get()};
    const newData = (await judicialBinProceduralStage.update(changes)).dataValues;
    return { oldData, newData };
  }

  async delete(id: string) {
    const proceduralStage = await this.findByID(id);
    const oldData = {...proceduralStage.get()};
    await proceduralStage.destroy();

    return { oldData };
  }
}

export default JudicialBinProceduralStageService;
