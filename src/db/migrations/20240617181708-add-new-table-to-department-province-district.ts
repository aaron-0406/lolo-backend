import { DataTypes, QueryInterface } from "sequelize";

import departmentModel from "../models/settings/department.model";
import provinceModel from "../models/settings/province.model";
import districtModel from "../models/settings/district.model";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(departmentModel.DEPARTMENT_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_department",
      type: DataTypes.INTEGER,
    },
    name: {
      field: "name",
      allowNull: false,
      type: DataTypes.STRING(150),
    },
    code: {
      field: "code",
      allowNull: false,
      type: DataTypes.STRING(10),
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
  });
  await queryInterface.createTable(provinceModel.PROVINCE_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_province",
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(150),
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING(10),
    },
    departmentId: {
      allowNull: false,
      field: "department_id_department",
      type: DataTypes.INTEGER,
      references: {
        model: departmentModel.DEPARTMENT_TABLE,
        key: "id_department",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
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
  });
  await queryInterface.createTable(districtModel.DISTRICT_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_district",
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(150),
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING(10),
    },
    provinceId: {
      allowNull: false,
      field: "province_id_province",
      type: DataTypes.INTEGER,
      references: {
        model: provinceModel.PROVINCE_TABLE,
        key: "id_province",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
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
  });
  async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(departmentModel.DEPARTMENT_TABLE);
    await queryInterface.dropTable(provinceModel.PROVINCE_TABLE);
    await queryInterface.dropTable(districtModel.DISTRICT_TABLE);
  }
}
