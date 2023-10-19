import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

export async function up(queryInterface: QueryInterface) {
  const deleteCriteria = {
    code: {
      [Op.startsWith]: "P03-",
    },
  };

  const newPermissions = [
    {
      name: "DETALLES - CLIENTE",
      code: "P02-02",
      icon: "-",
      link: "/cobranza/:urlIdentifier/clientes/:code",
    },
    {
      name: "COMENTARIOS",
      code: "P02-02-01",
      icon: "-",
      link: "/cobranza/:urlIdentifier/clientes/:code/gestion",
    },
    {
      name: "AGREGAR COMENTARIO",
      code: "P02-02-01-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR COMENTARIO",
      code: "P02-02-01-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR COMENTARIO",
      code: "P02-02-01-03",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR CLIENTE",
      code: "P02-03",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR CLIENTE",
      code: "P02-04",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR CLIENTE",
      code: "P02-05",
      icon: "-",
      link: "#",
    },
    {
      name: "WORD - DESCARGAR INFORMACIÓN DEL CLIENTE",
      code: "P02-02-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ARCHIVOS",
      code: "P02-02-03",
      icon: "-",
      link: "#",
    },
    {
      name: "VER ARCHIVO",
      code: "P02-02-03-01",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR ARCHIVO",
      code: "P02-02-03-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR ARCHIVO",
      code: "P02-02-03-03",
      icon: "-",
      link: "#",
    },
    {
      name: "FIADORES",
      code: "P02-02-04",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR FIADOR",
      code: "P02-02-04-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR FIADOR",
      code: "P02-02-04-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR FIADOR",
      code: "P02-02-04-03",
      icon: "-",
      link: "#",
    },
    {
      name: "DIRECCIONES",
      code: "P02-02-05",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR DIRECCIÓN",
      code: "P02-02-05-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR DIRECCIÓN",
      code: "P02-02-05-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR DIRECCIÓN",
      code: "P02-02-05-03",
      icon: "-",
      link: "#",
    },
    {
      name: "PRODUCTOS",
      code: "P02-02-06",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR PRODUCTO",
      code: "P02-02-06-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR PRODUCTO",
      code: "P02-02-06-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR PRODUCTO",
      code: "P02-02-06-03",
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
      [Op.startsWith]: "P02-",
      [Op.not]: "P02-01",
    },
  };

  const addPermissions = [
    {
      name: "COMENTARIOS",
      code: "P03-01",
      icon: "-",
      link: "/cobranza/:urlIdentifier/cobranza/:code",
    },
    {
      name: "AGREGAR COMENTARIO",
      code: "P03-01-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR COMENTARIO",
      code: "P03-01-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR COMENTARIO",
      code: "P03-01-03",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR CLIENTE",
      code: "P03-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR CLIENTE",
      code: "P03-03",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR CLIENTE",
      code: "P03-04",
      icon: "-",
      link: "#",
    },
    {
      name: "WORD - DESCARGAR INFORMACIÓN DEL CLIENTE",
      code: "P03-05",
      icon: "-",
      link: "#",
    },
    {
      name: "ARCHIVOS",
      code: "P03-06",
      icon: "-",
      link: "#",
    },
    {
      name: "VER ARCHIVO",
      code: "P03-06-01",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR ARCHIVO",
      code: "P03-06-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR ARCHIVO",
      code: "P03-06-03",
      icon: "-",
      link: "#",
    },
    {
      name: "FIADORES",
      code: "P03-07",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR FIADOR",
      code: "P03-07-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR FIADOR",
      code: "P03-07-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR FIADOR",
      code: "P03-07-03",
      icon: "-",
      link: "#",
    },
    {
      name: "DIRECCIONES",
      code: "P03-08",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR DIRECCIÓN",
      code: "P03-08-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR DIRECCIÓN",
      code: "P03-08-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR DIRECCIÓN",
      code: "P03-08-03",
      icon: "-",
      link: "#",
    },
    {
      name: "PRODUCTOS",
      code: "P03-09",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR PRODUCTO",
      code: "P03-09-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR PRODUCTO",
      code: "P03-09-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR PRODUCTO",
      code: "P03-09-03",
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
