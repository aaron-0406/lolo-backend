"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupModels = void 0;
const bank_model_1 = __importDefault(require("./bank.model"));
const customer_model_1 = __importDefault(require("./customer.model"));
const module_model_1 = __importDefault(require("./module.model"));
const customer_user_model_1 = __importDefault(require("./customer-user.model"));
const city_model_1 = __importDefault(require("./city.model"));
const client_model_1 = __importDefault(require("./client.model"));
const user_app_model_1 = __importDefault(require("./user-app.model"));
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const funcionario_model_1 = __importDefault(require("./funcionario.model"));
const direction_model_1 = __importDefault(require("./direction.model"));
const guarantor_model_1 = __importDefault(require("./guarantor.model"));
const comment_model_1 = __importDefault(require("./comment.model"));
const file_model_1 = __importDefault(require("./file.model"));
const negotiation_model_1 = __importDefault(require("./negotiation.model"));
const { Customer, CustomerSchema } = customer_model_1.default;
const { Funcionario, FuncionarioSchema } = funcionario_model_1.default;
const { Bank, BankSchema } = bank_model_1.default;
const { Module, ModuleSchema } = module_model_1.default;
const { CustomerUser, CustomerUserSchema } = customer_user_model_1.default;
const { City, CitySchema } = city_model_1.default;
const { Client, ClientSchema } = client_model_1.default;
const { UserApp, UserAppSchema } = user_app_model_1.default;
const { Direction, DirectionSchema } = direction_model_1.default;
const { Guarantor, GuarantorSchema } = guarantor_model_1.default;
const { Comment, CommentSchema } = comment_model_1.default;
const { File, FileSchema } = file_model_1.default;
const { Negotiation, NegotiationSchema } = negotiation_model_1.default;
const { CustomerHasBank, CustomerHasBankSchema } = customer_has_bank_model_1.default;
const setupModels = (sequelize) => {
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Funcionario.init(FuncionarioSchema, Funcionario.config(sequelize));
    Bank.init(BankSchema, Bank.config(sequelize));
    Module.init(ModuleSchema, Module.config(sequelize));
    CustomerUser.init(CustomerUserSchema, CustomerUser.config(sequelize));
    City.init(CitySchema, City.config(sequelize));
    Client.init(ClientSchema, Client.config(sequelize));
    File.init(FileSchema, File.config(sequelize));
    UserApp.init(UserAppSchema, UserApp.config(sequelize));
    Direction.init(DirectionSchema, Direction.config(sequelize));
    Guarantor.init(GuarantorSchema, Guarantor.config(sequelize));
    Comment.init(CommentSchema, Comment.config(sequelize));
    Negotiation.init(NegotiationSchema, Negotiation.config(sequelize));
    CustomerHasBank.init(CustomerHasBankSchema, CustomerHasBank.config(sequelize));
    Customer.associate(sequelize.models);
    CustomerUser.associate(sequelize.models);
    Bank.associate(sequelize.models);
    Funcionario.associate(sequelize.models);
    City.associate(sequelize.models);
    Client.associate(sequelize.models);
    File.associate(sequelize.models);
    Comment.associate(sequelize.models);
    Direction.associate(sequelize.models);
    Guarantor.associate(sequelize.models);
};
exports.setupModels = setupModels;
