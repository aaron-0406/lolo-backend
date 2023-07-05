import { Sequelize } from "sequelize";
import banksModel from "./bank.model";
import customerModel from "./customer.model";
import moduleModel from "./module.model";
import customerUserModel from "./customer-user.model";
import cityModel from "./city.model";
import clientModel from "./client.model";
import userAppModel from "./user-app.model";
import customerHasBank from "./many-to-many/customer-has-bank.model";
import funcionarioModel from "./funcionario.model";
import directionModel from "./direction.model";
import guarantorModel from "./guarantor.model";
import managementActionModel from "./management-action.model";
import commentModel from "./comment.model";
import fileModel from "./file.model";
import negotiationModel from "./negotiation.model";
import templateModel from "./template.model";
import templateDataModel from "./many-to-many/template-has-values.model";
import ecampoModel from "./ecampo.model";
import valuesModel from "./values.model";
import templateImgModel from "./template-img.model";
import productModel from "./product.model";
import goalModel from "./goal.model";
import goalUserModel from "./goal-user.model";

const { Customer, CustomerSchema } = customerModel;
const { Funcionario, FuncionarioSchema } = funcionarioModel;
const { Bank, BankSchema } = banksModel;
const { Module, ModuleSchema } = moduleModel;
const { CustomerUser, CustomerUserSchema } = customerUserModel;
const { City, CitySchema } = cityModel;
const { Client, ClientSchema } = clientModel;
const { UserApp, UserAppSchema } = userAppModel;
const { Direction, DirectionSchema } = directionModel;
const { Guarantor, GuarantorSchema } = guarantorModel;
const { ManagementAction, ManagementActionSchema } = managementActionModel;
const { Comment, CommentSchema } = commentModel;
const { File, FileSchema } = fileModel;
const { Negotiation, NegotiationSchema } = negotiationModel;
const { Template, TemplateSchema } = templateModel;
const { ECampo, ECampoSchema } = ecampoModel;
const { TemplateHasValues, TemplateHasValuesSchema } = templateDataModel;
const { Values, ValuesSchema } = valuesModel;
const { CustomerHasBank, CustomerHasBankSchema } = customerHasBank;
const { TemplateImg, TemplateImgSchema } = templateImgModel;
const { Product, ProductSchema } = productModel;
const { Goal, GoalSchema } = goalModel;
const { GoalUser, GoalUserSchema } = goalUserModel;

export const setupModels = (sequelize: Sequelize) => {
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Bank.init(BankSchema, Bank.config(sequelize));
  Module.init(ModuleSchema, Module.config(sequelize));
  CustomerUser.init(CustomerUserSchema, CustomerUser.config(sequelize));
  City.init(CitySchema, City.config(sequelize));
  Client.init(ClientSchema, Client.config(sequelize));
  File.init(FileSchema, File.config(sequelize));
  UserApp.init(UserAppSchema, UserApp.config(sequelize));
  Direction.init(DirectionSchema, Direction.config(sequelize));
  Guarantor.init(GuarantorSchema, Guarantor.config(sequelize));
  ManagementAction.init(
    ManagementActionSchema,
    ManagementAction.config(sequelize)
  );
  Comment.init(CommentSchema, Comment.config(sequelize));
  CustomerHasBank.init(
    CustomerHasBankSchema,
    CustomerHasBank.config(sequelize)
  );
  Funcionario.init(FuncionarioSchema, Funcionario.config(sequelize));
  Negotiation.init(NegotiationSchema, Negotiation.config(sequelize));
  Template.init(TemplateSchema, Template.config(sequelize));
  ECampo.init(ECampoSchema, ECampo.config(sequelize));
  TemplateHasValues.init(
    TemplateHasValuesSchema,
    TemplateHasValues.config(sequelize)
  );
  Values.init(ValuesSchema, Values.config(sequelize));
  TemplateImg.init(TemplateImgSchema, TemplateImg.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Goal.init(GoalSchema, Goal.config(sequelize));
  GoalUser.init(GoalUserSchema, GoalUser.config(sequelize));

  Customer.associate(sequelize.models);
  CustomerUser.associate(sequelize.models);
  Bank.associate(sequelize.models);
  City.associate(sequelize.models);
  Client.associate(sequelize.models);
  File.associate(sequelize.models);
  ManagementAction.associate(sequelize.models);
  Comment.associate(sequelize.models);
  Direction.associate(sequelize.models);
  Guarantor.associate(sequelize.models);
  Funcionario.associate(sequelize.models);
  Negotiation.associate(sequelize.models);
  Template.associate(sequelize.models);
  ECampo.associate(sequelize.models);
  TemplateHasValues.associate(sequelize.models);
  Values.associate(sequelize.models);
  TemplateImg.associate(sequelize.models);
  Product.associate(sequelize.models);
  Goal.associate(sequelize.models);
  GoalUser.associate(sequelize.models);
};
