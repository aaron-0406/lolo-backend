import { DataTypes, QueryInterface } from "sequelize";
import productModel from "../models/ext-contacts.model";
import productTypeModel from "../models/ext-contact-type.model";

const { EXT_CONTACT_TABLE } = productModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(EXT_CONTACT_TABLE, "dni", {
    allowNull: true,
    type: DataTypes.STRING(20),
  });

  await queryInterface.addColumn(
    EXT_CONTACT_TABLE,
    "ext_contact_type_id_ext_contact_type",
    {
      allowNull: true,
      field: "ext_contact_type_id_ext_contact_type",
      type: DataTypes.INTEGER,
      references: {
        model: productTypeModel.EXT_CONTACT_TYPE_TABLE,
        key: "id_ext_contact_type",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    }
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(EXT_CONTACT_TABLE, "dni");
  await queryInterface.removeColumn(
    EXT_CONTACT_TABLE,
    "ext_contact_type_id_ext_contact_type"
  );
}
