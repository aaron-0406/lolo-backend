import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialRegisterOfficeType } from "../types/judicial-register-office.type";

const { models } = sequelize;

class JudicialRegisterOfficeService {
  constructor() {}

  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_REGISTER_OFFICE.findAll({
      where: { customerHasBankId: chb },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialRegisterOffice =
      await models.JUDICIAL_REGISTER_OFFICE.findOne({
        where: {
          id,
        },
      });

    if (!judicialRegisterOffice) {
      throw boom.notFound("Oficina registral no encontrada");
    }

    return judicialRegisterOffice;
  }

  async create(data: JudicialRegisterOfficeType) {
    const newJudicialRegisterOffice =
      await models.JUDICIAL_REGISTER_OFFICE.create(data);
    return newJudicialRegisterOffice;
  }

  async update(id: string, changes: JudicialRegisterOfficeType) {
    const judicialRegisterOffice = await this.findByID(id);
    const oldJudicialRegisterOffice = { ...judicialRegisterOffice.get() };
    const newJudicialRegisterOffice = await judicialRegisterOffice.update(changes);
    return { oldJudicialRegisterOffice, newJudicialRegisterOffice };
  }

  async delete(id: string) {
    const registerOffice = await this.findByID(id);
    const oldJudicialRegisterOffice = { ...registerOffice.get() };
    await registerOffice.destroy();

    return oldJudicialRegisterOffice;
  }
}

export default JudicialRegisterOfficeService;
