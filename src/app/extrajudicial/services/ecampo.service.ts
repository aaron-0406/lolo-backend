import sequelize from "../../../libs/sequelize";

const { models } = sequelize;

class ECampoService {
  constructor() {}

  async findAllByTemplateId(id: string) {
    const rta = await models.ECAMPO.findAll({
      where: { template_id_template: id },
    });
    return rta;
  }
}

export default ECampoService;
