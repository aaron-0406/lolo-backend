import sequelize from "../../../libs/sequelize";
import boom from "@hapi/boom";
import { JudicialSubjectType } from "../types/judicial-subject.type";

const { models } = sequelize;

class JudicialSubjectService {
  constructor() {}

  async findAll() {
    const rta = await models.JUDICIAL_SUBJECT.findAll();
    return rta;
  }
  async findAllByCHB(chb: number) {
    const rta = await models.JUDICIAL_SUBJECT.findAll({
      where: { customerHasBankId: { chb } },
    });
    return rta;
  }

  async findByID(id: string) {
    const judicialSubject = await models.JUDICIAL_SUBJECT.findOne({
      where: {
        id,
      },
    });

    if (!judicialSubject) {
      throw boom.notFound("Asunto no encontrado");
    }

    return judicialSubject;
  }

  async create(data: JudicialSubjectType) {
    const newJudicialSubject = await models.JUDICIAL_SUBJECT.create(data);
    return newJudicialSubject;
  }

  async update(id: string, changes: JudicialSubjectType) {
    const judicialSubject = await this.findByID(id);
    const rta = await judicialSubject.update(changes);

    return rta;
  }

  async delete(id: string) {
    const judicialSubject = await this.findByID(id);
    await judicialSubject.destroy();

    return { id };
  }
}

export default JudicialSubjectService;
