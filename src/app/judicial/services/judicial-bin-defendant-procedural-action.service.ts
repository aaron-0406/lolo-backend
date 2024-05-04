import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialBinDefendantProceduralActionType } from "../types/judicial-bin-defendant-procedural-action.type";

const { models } = sequelize;

class JudicialBinDefendantProceduralActionService {
  constructor() {}

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION.findAll({
      where: { customerHasBankId: chb },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialBinDefendantProceduralAction =
      await models.JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION.findOne({
        where: {
          id,
        },
      });

    if (!judicialBinDefendantProceduralAction) {
      throw boom.notFound("Actuación Procesal Demamdado no encontrada");
    }

    return judicialBinDefendantProceduralAction;
  }

  async create(data: JudicialBinDefendantProceduralActionType) {
    const newJudicialBinProceduralStage =
      await models.JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION.create(data);
    return newJudicialBinProceduralStage;
  }

  async update(id: string, changes: JudicialBinDefendantProceduralActionType) {
    const judicialBinDefendantProceduralAction = await this.findByID(id);
    const rta = await judicialBinDefendantProceduralAction.update(changes);
    return rta;
  }

  async delete(id: string) {
    const defendantProceduralAction = await this.findByID(id);
    await defendantProceduralAction.destroy();

    return { id };
  }
}

export default JudicialBinDefendantProceduralActionService;
