import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialRegisterOfficeType } from "../types/judicial-register-office.type";

const { models } = sequelize;

class JudicialRegisterOfficeService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_REGISTER_OFFICE.findAll();
    return rta;
  }

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_REGISTER_OFFICE.findAll({
      where: { customerHasBankId: chb },
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_REGISTER_OFFICE,
          as: "judicialCaseFileHasRegisterOffice",
          attributes: ["id", "judicialCaseFileId", "judicialRegisterOfficeId"],
        },
      ],
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialRegisterOffice = await models.JUDICIAL_REGISTER_OFFICE.findOne({
      where: {
        id,
      },
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_REGISTER_OFFICE,
          as: "judicialCaseFileHasRegisterOffice",
          attributes: ["id", "judicialCaseFileId", "judicialRegisterOfficeId"],
        },
      ],
    });

    if (!judicialRegisterOffice) {
      throw boom.notFound("Registro de Oficina no encontrado");
    }

    return judicialRegisterOffice;
  }

  async create(data: JudicialRegisterOfficeType) {
    const newJudicialRegisterOffice = await models.JUDICIAL_REGISTER_OFFICE.create(data);
    await newJudicialRegisterOffice.reload({
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_REGISTER_OFFICE,
          as: "judicialCaseFileHasRegisterOffice",
          attributes: ["id", "judicialCaseFileId", "judicialRegisterOfficeId"],
        },
      ],
    });
    return newJudicialRegisterOffice;
  }

  async update(id: string, changes: JudicialRegisterOfficeType) {
    const judicialRegisterOffice = await this.findByID(id);
    const rta = await judicialRegisterOffice.update(changes);
    await rta.reload({
      include: [
        {
          model: models.JUDICIAL_CASE_FILE_HAS_REGISTER_OFFICE,
          as: "judicialCaseFileHasRegisterOffice",
          attributes: ["id", "judicialCaseFileId", "judicialRegisterOfficeId"],
        },
      ],
    });
    return rta;
  }

  async delete(id: string) {
    const registerOffice = await this.findByID(id);
    await registerOffice.destroy();

    return { id };
  }
}

export default JudicialRegisterOfficeService;