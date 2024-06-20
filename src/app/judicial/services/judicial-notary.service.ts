import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialNotaryType } from "../types/judicial-notary.type";

const { models } = sequelize;

class JudicialNotaryService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_NOTARY.findAll();
    return rta;
  }

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_NOTARY.findAll({
      where: { customerHasBankId: chb },
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_NOTARY,
          as: "judicialCaseFileHasNotary",
          attributes: ["id", "judicialCaseFileId", "judicialNotaryId"],
        },
      ],
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialNotary = await models.JUDICIAL_NOTARY.findOne({
      where: {
        id,
      },
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_NOTARY,
          as: "judicialCaseFileHasNotary",
          attributes: ["id", "judicialCaseFileId", "judicialNotaryId"],
        },
      ],
    });

    if (!judicialNotary) {
      throw boom.notFound("Notario no encontrado");
    }

    return judicialNotary;
  }

  async create(data: JudicialNotaryType) {
    const newJudicialNotary = await models.JUDICIAL_NOTARY.create(data);
    await newJudicialNotary.reload({
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_NOTARY,
          as: "judicialCaseFileHasNotary",
          attributes: ["id", "judicialCaseFileId", "judicialNotaryId"],
        },
      ],
    });
    return newJudicialNotary;
  }

  async update(id: string, changes: JudicialNotaryType) {
    const judicialNotary = await this.findByID(id);
    const rta = await judicialNotary.update(changes);
    await rta.reload({
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_NOTARY,
          as: "judicialCaseFileHasNotary",
          attributes: ["id", "judicialCaseFileId", "judicialNotaryId"],
        },
      ],
    });
    return rta;
  }

  async delete(id: string) {
    const notary = await this.findByID(id);
    await notary.destroy();

    return { id };
  }
}

export default JudicialNotaryService;