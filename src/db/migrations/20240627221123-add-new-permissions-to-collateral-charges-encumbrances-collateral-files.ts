import { QueryInterface, Op, QueryTypes } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const codesOptGarantias = ["P42"];

const newPermissions = [
  {
    name: "TIPO DE CARGA",
    code: "P42",
    icon: "ri-file-shield-2-fill",
    link: "/judicial/:urlIdentifier/cargas-y-gravemenes",
  },
  {
    name: "AGREGAR TIPO DE CARGA - CARGAS Y GRAVEMENES",
    code: "P42-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR TIPO DE CARGA - CARGAS Y GRAVEMENES",
    code: "P42-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR TIPO DE CARGA - CARGAS Y GRAVEMENES",
    code: "P42-03",
    icon: "-",
    link: "#",
  },
  {
    name: "CARGAS Y GRAVEMENES",
    code: "P13-01-06-01-02",
    icon: "ri-folder-shield-2-fill",
    link: "/judicial/:urlIdentifier/expediente/:code/garantia/:collateralCode/cargas-y-gravemenes",
  },
  {
    name: "AGREGAR CARGAS Y GRAVEMENES",
    code: "P13-01-06-01-02-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR CARGAS Y GRAVEMENES",
    code: "P13-01-06-01-02-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR CARGAS Y GRAVEMENES",
    code: "P13-01-06-01-02-03",
    icon: "-",
    link: "#",
  },
  {
    name: "ARCHIVOS",
    code: "P13-01-06-01-03",
    icon: "ri-file-4-line",
    link: "/judicial/:urlIdentifier/expediente/:code/garantia/:collateralCode/archivos",
  },
  {
    name: "VER ARCHIVO",
    code: "P13-01-06-01-03-01",
    icon: "-",
    link: "#",
  },
  {
    name: "AGREGAR VER ARCHIVO",
    code: "P13-01-06-01-03-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR ARCHIVO",
    code: "P13-01-06-01-03-03",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR ARCHIVO",
    code: "P13-01-06-01-03-04",
    icon: "-",
    link: "#",
  }
];

export async function up(queryInterface: QueryInterface) {
  let permissionsOpt: any[] = [];
  const dropdownGarantiasId = await queryInterface.sequelize.query(
    `SELECT id_permission FROM ${PERMISSION_TABLE} WHERE code = 'P37'`,
    { type: QueryTypes.SELECT }
  );

  const newIdPermissionDropdownGarantias =
    Array.isArray(dropdownGarantiasId) &&
    dropdownGarantiasId.length
      ? (dropdownGarantiasId[0] as { id_permission: number }).id_permission
      : null;

  if (newIdPermissionDropdownGarantias) {
    newPermissions.forEach((permission) => {
      if (codesOptGarantias.includes(permission.code)) {
        permissionsOpt.push({
          ...permission,
          id_permission_main: newIdPermissionDropdownGarantias,
        });
      }
    });
  }

  const permissionsActions = newPermissions.filter(
    (permission) => !codesOptGarantias.includes(permission.code)
  );

  try {
    if (permissionsOpt.length) {
      await queryInterface.bulkInsert(PERMISSION_TABLE, permissionsOpt);
    }

    if (permissionsActions.length) {
      await queryInterface.bulkInsert(PERMISSION_TABLE, permissionsActions);
    }
  } catch (error) {
    console.error("Error during bulk insert:", error);
  }
}

export async function down(queryInterface: QueryInterface) {
  const deleteCriteria = {
    code: {
      [Op.startsWith]: ["P42", "P13-01-06-01-02", "P13-01-06-01-03"],
    },
  };

  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}
