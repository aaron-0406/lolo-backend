import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

export async function up(queryInterface: QueryInterface) {
  const deleteCriteria = {
    code: {
      [Op.startsWith]: ["P07", "P08", "P09", "P11"],
    },
  };

  const newPermissions = [
    {
      name: "CONFIGURACIONES",
      code: "P07",
      icon: "-",
      link: "#",
      drop_down: 1,
    },
    {
      name: "INACTIVO",
      code: "P08",
      icon: "-",
      link: "#",
    },
    {
      name: "INACTIVO",
      code: "P09",
      icon: "-",
      link: "#",
    },
    {
      name: "INACTIVO",
      code: "P11",
      icon: "-",
      link: "#",
    },
    {
      name: "ACCIONES",
      code: "P07-01",
      icon: "ri-pencil-ruler-2-fill",
      link: "/cobranza/:urlIdentifier/acciones",
    },
    {
      name: "AGREGAR ACCIÓN",
      code: "P07-01-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR ACCIÓN",
      code: "P07-01-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR ACCIÓN",
      code: "P07-01-03",
      icon: "-",
      link: "#",
    },
    {
      name: "FUNCIONARIOS",
      code: "P07-02",
      icon: "ri-briefcase-fill",
      link: "/cobranza/:urlIdentifier/funcionarios",
    },
    {
      name: "AGREGAR FUNCIONARIO",
      code: "P07-02-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR FUNCIONARIO",
      code: "P07-02-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR FUNCIONARIO",
      code: "P07-02-03",
      icon: "-",
      link: "#",
    },
    {
      name: "NEGOCIACIONES",
      code: "P07-03",
      icon: "ri-folder-2-fill",
      link: "/cobranza/:urlIdentifier/negociaciones",
    },
    {
      name: "AGREGAR NEGOCIACIÓN",
      code: "P07-03-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR NEGOCIACIÓN",
      code: "P07-03-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR NEGOCIACIÓN",
      code: "P07-03-03",
      icon: "-",
      link: "#",
    },
    {
      name: "ROLES",
      code: "P07-04",
      icon: "ri-shield-user-line",
      link: "/:urlIdentifier/roles",
    },
    {
      name: "AGREGAR ROL",
      code: "P07-04-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR ROL",
      code: "P07-04-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR ROL",
      code: "P07-04-01",
      icon: "-",
      link: "#",
    },
  ];

  return queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria, {
      transaction,
    });
    await queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions, {
      transaction,
    });
  });
}

export async function down(queryInterface: QueryInterface) {
  const deleteCriteria = {
    code: {
      [Op.startsWith]: ["P07", "P08", "P09", "P11"],
    },
  };

  const addPermissions = [
    {
      name: "ACCIONES",
      code: "P07",
      icon: "ri-pencil-ruler-2-fill",
      link: "/cobranza/:urlIdentifier/acciones",
    },
    {
      name: "AGREGAR ACCIÓN",
      code: "P07-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR ACCIÓN",
      code: "P07-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR ACCIÓN",
      code: "P07-03",
      icon: "-",
      link: "#",
    },
    {
      name: "FUNCIONARIOS",
      code: "P08",
      icon: "ri-briefcase-fill",
      link: "/cobranza/:urlIdentifier/funcionarios",
    },
    {
      name: "AGREGAR FUNCIONARIO",
      code: "P08-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR FUNCIONARIO",
      code: "P08-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR FUNCIONARIO",
      code: "P08-03",
      icon: "-",
      link: "#",
    },
    {
      name: "NEGOCIACIONES",
      code: "P09",
      icon: "ri-folder-2-fill",
      link: "/cobranza/:urlIdentifier/negociaciones",
    },
    {
      name: "AGREGAR NEGOCIACIÓN",
      code: "P09-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR NEGOCIACIÓN",
      code: "P09-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR NEGOCIACIÓN",
      code: "P09-03",
      icon: "-",
      link: "#",
    },
    {
      name: "ROLES",
      code: "P11",
      icon: "ri-shield-user-line",
      link: "/:urlIdentifier/roles",
    },
    {
      name: "AGREGAR ROL",
      code: "P11-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR ROL",
      code: "P11-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR ROL",
      code: "P11-03",
      icon: "-",
      link: "#",
    },
  ];

  return queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria, {
      transaction,
    });
    await queryInterface.bulkInsert(PERMISSION_TABLE, addPermissions, {
      transaction,
    });
  });
}
