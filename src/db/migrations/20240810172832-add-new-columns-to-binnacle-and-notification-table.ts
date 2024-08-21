import { QueryInterface, DataTypes, Op } from "sequelize";
import judicialBinnacleModel from "../models/judicial-binnacle.model"
import judicialBinNotificationModel from "../models/judicial-bin-notification.model";
import permissionsModel from "../models/permission.model";

const { JUDICIAL_BINNACLE_TABLE } = judicialBinnacleModel
const { JUDICIAL_BIN_NOTIFICATION_TABLE } = judicialBinNotificationModel
const { PERMISSION_TABLE } = permissionsModel

const newPermissions = [
  {
    name: 'DETALLES DE LA BITACORA',
    code: 'P13-01-01-04',
    icon: '-',
    link: '/judicial/:urlIdentifier/expediente/:code/bitacora/:binnacleCode'
  },
  {
    name: 'AGREGAR NOTIFICACIÓN',
    code: 'P13-01-01-04-01',
    icon: '-',
    link: '#'
  },
  {
    name: 'ACTUALIZAR NOTIFICACIÓN',
    code: 'P13-01-01-04-02',
    icon: '-',
    link: '#'
  },
  {
    name: 'ELIMINAR NOTIFICACIÓN',
    code: 'P13-01-01-04-03',
    icon: '-',
    link: '#'
  }
]

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'index', {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  })

  await queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'resolution_date', {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  })

  await queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'entry_date', {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  })

  await queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'notification_type', {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null
  })

  await queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'acto', {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null
  })

  await queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'fojas', {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  })

  await queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'folios', {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  })

  await queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'provedio_date', {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
   })

  await queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'user_description', {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null
  })

  await queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'created_by', {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null
  })

  await queryInterface.createTable(JUDICIAL_BIN_NOTIFICATION_TABLE, {
    id: {
      type: DataTypes.INTEGER,
      field: 'id_judicial_bin_notification',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      field: 'number',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    addressee: {
      field: 'addressee',
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    shipDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'ship_date',
    },
    attachments: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'attachments',
    },
    deliveryMethod: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'delivery_method',
    },
    resolutionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'resolution_date',
    },
    notificationPrint: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'notification_print',
    },
    sentCentral: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'sent_central',
    },
    centralReceipt: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'central_receipt',
    },
    createdAt: {
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      field: "deleted_at",
      type: DataTypes.DATE,
    },
    idJudicialBinacle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'judicial_binacle_id_judicial_binacle',
      references: {
        model: JUDICIAL_BINNACLE_TABLE,
        key: 'id_judicial_binnacle',
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
    },
  })

  await queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions)
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(JUDICIAL_BINNACLE_TABLE, 'notificationType')
  await queryInterface.removeColumn(JUDICIAL_BINNACLE_TABLE, 'userDescription')
  await queryInterface.removeColumn(JUDICIAL_BINNACLE_TABLE, 'fojas')
  await queryInterface.removeColumn(JUDICIAL_BINNACLE_TABLE, 'createdBy')
  await queryInterface.dropTable(JUDICIAL_BIN_NOTIFICATION_TABLE)
  const deleteCriteria = {
    code: {
      [Op.startsWith]: [
        "P13-01-01-04",
        "P13-01-01-04-01",
        "P13-01-01-04-02",
        "P13-01-01-04-03",
      ],
    },
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}