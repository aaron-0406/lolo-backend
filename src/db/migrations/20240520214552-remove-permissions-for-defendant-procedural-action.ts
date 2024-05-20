import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";
import rolePermissionModel from "../models/many-to-many/role-permission.model";
import judicialBinnacleModel from "../models/judicial-binnacle.model";
import judicialBinDefendantProceduralActionModel from "../models/judicial-bin-defendant-procedural-action.model";

const { PERMISSION_TABLE } = permissionModel;
const { ROLE_PERMISSION_TABLE } = rolePermissionModel;
const { JUDICIAL_BINNACLE_TABLE } = judicialBinnacleModel;
const { JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE } = judicialBinDefendantProceduralActionModel;

const removePermissions = [
  {
    name: "ACTUACIÓN PROCESAL DEMANDADO",
    code: "P26",
    icon: "ri-book-2-fill",
    link: "/judicial/:urlIdentifier/actuacion-procesal-demandado",
  },
  {
    name: "CREAR ACTUACIÓN PROCESAL DEMANDADO",
    code: "P26-01",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR ACTUACIÓN PROCESAL DEMANDADO",
    code: "P26-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR ACTUACIÓN PROCESAL DEMANDADO",
    code: "P26-03",
    icon: "-",
    link: "#",
  },
];

const permissionIdsDelete = [159, 160, 161, 162];

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete(ROLE_PERMISSION_TABLE, {
    permission_id_permission: {
      [Op.in]: permissionIdsDelete,
    },
  });
  await queryInterface.bulkDelete(PERMISSION_TABLE, {
    [Op.or]: removePermissions,
  });
  await queryInterface.removeColumn(
    JUDICIAL_BINNACLE_TABLE,
    "id_defendant_procedural_action"
  );
  await queryInterface.removeColumn(
    JUDICIAL_BINNACLE_TABLE,
    "defendant_procedural_action_id"
  );
  await queryInterface.dropTable(
    JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE,
  );
}

