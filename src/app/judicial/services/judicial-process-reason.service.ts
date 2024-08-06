import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialProcessReasonType } from "../types/judicial-process-reason.type";

const { models } = sequelize;

class judicialProcessReasonService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_PROCESS_REASON.findAll();
    return rta;
  }

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_PROCESS_REASON.findAll({
      where: {
        customer_has_bank_id_customer_has_bank: chb,
      },
    });

    if (!rta) {
      throw boom.notFound("Motivos no encontrados");
    }

    return rta;
  }

  async findByID(id: number) {
    const judicialProcessReason = await models.JUDICIAL_PROCESS_REASON.findOne({
      where: {
        id_judicial_process_status_reason: id,
      },
    });

    if (!judicialProcessReason) {
      throw boom.notFound("Motivo del proceso no encontrado");
    }
    return judicialProcessReason;
  }

  async create(data: JudicialProcessReasonType) {
    const newJudicialProcessReason = await models.JUDICIAL_PROCESS_REASON.create(data);
    return newJudicialProcessReason;
  }

  async update(id: number, changes: JudicialProcessReasonType) {
    const judicialProcessReason = await this.findByID(id);
    const oldJudicialProcessReason = { ...judicialProcessReason.get() };
    const newJudicialProcessReason = await judicialProcessReason.update(changes);

    return { oldJudicialProcessReason, newJudicialProcessReason };
  }

  async delete(id: number) {
    const judicialProcessReason = await this.findByID(id);
    const oldJudicialProcessReason = { ...judicialProcessReason.get() };
    await judicialProcessReason.destroy();

    return oldJudicialProcessReason;
  }
}

export default judicialProcessReasonService ;
