import { QueryInterface, Op } from 'sequelize';
import permissionModel from '../models/permission.model';
const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "VER CUADRO TARIFAS",
    code: "P13-01-05-01-01-04",
    icon: "-",
    link: "#",
  },
  {
    name: "VER TARIFAS ASIGNADAS",
    code: "P13-01-05-01-01-05",
    icon: "-",
    link: "#",
  },
  {
    name: 'DETALLES DE LA BITACORA',
    code: 'P13-01-05-01-01-06',
    icon: '-',
    link: '/judicial/:urlIdentifier/expediente/:code/procesos-conexos/:relatedProcessCode/bitacora/:binnacleCode'
  },
  {
    name: "NOTIFICACIONES",
    code: "P13-01-05-01-01-06-01",
    icon: "ri-notification-badge-fill",
    link: "/judicial/:urlIdentifier/expediente/:code/procesos-conexos/:relatedProcessCode/bitacora/:binnacleCode/notificaciones"
  },
  {
    name: 'AGREGAR NOTIFICACIÓN',
    code: 'P13-01-05-01-01-06-02',
    icon: '-',
    link: '#'
  },
  {
    name: 'ACTUALIZAR NOTIFICACIÓN',
    code: 'P13-01-05-01-01-06-03',
    icon: '-',
    link: '#'
  },
  {
    name: 'ELIMINAR NOTIFICACIÓN',
    code: 'P13-01-01-06-01-06-04',
    icon: '-',
    link: '#'
  }
]

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions);
}

export async function down(queryInterface: QueryInterface) {
  const deleteCriteria = {
    code: {
      [Op.startsWith]: [
        "P13-01-05-01-01-04",
        "P13-01-05-01-01-05",
        "P13-01-05-01-01-06",
      ],
    },
  };

  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}