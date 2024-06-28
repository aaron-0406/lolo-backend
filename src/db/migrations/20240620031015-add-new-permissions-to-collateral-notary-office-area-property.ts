import { QueryInterface, Op, QueryTypes } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const dropdownGarantias = {
  name: "OPT GARANTIAS",
  code: "P37",
  icon: "-",
  link: "#",
  id_permission_main: 60,
  is_dropdown: true,
};

const codesOptGarantias = ["P38", "P39", "P40", "P41"];

const newPermissions = [
  {
    name: "USO DEL BIEN",
    code: "P38",
    icon: "ri-home-2-fill",
    link: "/judicial/:urlIdentifier/uso-del-bien",
  },
  {
    name: "AGREGAR USO DEL BIEN",
    code: "P38-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR USO DEL BIEN",
    code: "P38-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR USO DEL BIEN",
    code: "P38-03",
    icon: "-",
    link: "#",
  },
  {
    name: "ZONA REGISTRAL",
    code: "P39",
    icon: "ri-road-map-fill",
    link: "/judicial/:urlIdentifier/zona-registral",
  },
  {
    name: "AGREGAR ZONA REGISTRAL",
    code: "P39-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR ZONA REGISTRAL",
    code: "P39-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR ZONA REGISTRAL",
    code: "P39-03",
    icon: "-",
    link: "#",
  },
  {
    name: "OFICINA REGISTRAL",
    code: "P40",
    icon: "ri-building-fill",
    link: "/judicial/:urlIdentifier/oficina-registral",
  },
  {
    name: "AGREGAR OFICINA REGISTRAL",
    code: "P40-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR OFICINA REGISTRAL",
    code: "P40-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR OFICINA REGISTRAL",
    code: "P40-03",
    icon: "-",
    link: "#",
  },
  {
    name: "NOTARIA",
    code: "P41",
    icon: "ri-article-fill",
    link: "/judicial/:urlIdentifier/notaria",
  },
  {
    name: "AGREGAR NOTARIA",
    code: "P41-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR NOTARIA",
    code: "P41-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR NOTARIA",
    code: "P41-03",
    icon: "-",
    link: "#",
  },
  {
    name: "GARANTIAS",
    code: "P13-01-06",
    icon: "ri-red-packet-line",
    link: "/judicial/:urlIdentifier/expediente/:code/garantia",
  },
  {
    name: "DETALLE GARANTIA",
    code: "P13-01-06-01",
    icon: "-",
    link: "/judicial/:urlIdentifier/expediente/:code/garantia/:collateralCode",
  },
  {
    name: "ASIGNAR GARANTIA",
    code: "P13-01-06-01-01",
    icon: "-",
    link: "#",
  },
  {
    name: "AGREGAR GARANTÍA",
    code: "P13-01-06-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR GARANTÍA",
    code: "P13-01-06-03",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR GARANTÍA",
    code: "P13-01-06-04",
    icon: "-",
    link: "#",
  },
];

export async function up(queryInterface: QueryInterface) {
  let permissionsOpt: any[] = [];
  await queryInterface.bulkInsert(PERMISSION_TABLE, [dropdownGarantias]);
  const dropdownGarantiasId = await queryInterface.sequelize.query(
    `SELECT id_permission FROM ${PERMISSION_TABLE} WHERE code = 'P37'`,
    { type: QueryTypes.SELECT }
  );

  const newIdPermissionDropdownGarantias =
  Array.isArray(dropdownGarantiasId) &&
  dropdownGarantiasId.length
    ? (dropdownGarantiasId[0] as { id_permission: number })
        .id_permission
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
  await queryInterface.bulkInsert(PERMISSION_TABLE, permissionsOpt);
  await queryInterface.bulkInsert(PERMISSION_TABLE, permissionsActions);
}

export async function down(queryInterface: QueryInterface) {
  const deleteCriteria = {
    code: {
      [Op.startsWith]: ["P37", "P38", "P39", "P40", "P41", "P13-01-06"],
    },
  };

  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}
