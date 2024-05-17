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
// import guarantorModel from "./guarantor.model";
const management_action_model_1 = __importDefault(require("./management-action.model"));
const comment_model_1 = __importDefault(require("./comment.model"));
const ext_address_type_model_1 = __importDefault(require("./ext-address-type.model"));
const ext_contacts_model_1 = __importDefault(require("./ext-contacts.model"));
const ext_tag_group_model_1 = __importDefault(require("./ext-tag-group.model"));
const ext_tag_model_1 = __importDefault(require("./ext-tag.model"));
const file_model_1 = __importDefault(require("./file.model"));
const negotiation_model_1 = __importDefault(require("./negotiation.model"));
const template_model_1 = __importDefault(require("./template.model"));
const template_has_values_model_1 = __importDefault(require("./many-to-many/template-has-values.model"));
const ecampo_model_1 = __importDefault(require("./ecampo.model"));
const values_model_1 = __importDefault(require("./values.model"));
const template_img_model_1 = __importDefault(require("./template-img.model"));
const product_model_1 = __importDefault(require("./product.model"));
const goal_model_1 = __importDefault(require("./goal.model"));
const goal_user_model_1 = __importDefault(require("./goal-user.model"));
const permission_model_1 = __importDefault(require("./permission.model"));
const roles_model_1 = __importDefault(require("./roles.model"));
const role_permission_model_1 = __importDefault(require("./many-to-many/role-permission.model"));
const judicial_case_file_model_1 = __importDefault(require("./judicial-case-file.model"));
const judicial_subject_model_1 = __importDefault(require("./judicial-subject.model"));
const judicial_court_model_1 = __importDefault(require("./judicial-court.model"));
const judicial_procedural_way_model_1 = __importDefault(require("./judicial-procedural-way.model"));
const user_log_model_1 = __importDefault(require("./user-log.model"));
const ext_ip_address_bank_model_1 = __importDefault(require("./ext-ip-address-bank.model"));
const ext_contact_type_model_1 = __importDefault(require("./ext-contact-type.model"));
const judicial_obs_type_model_1 = __importDefault(require("./judicial-obs-type.model"));
const judicial_observation_model_1 = __importDefault(require("./judicial-observation.model"));
const judicial_obs_file_model_1 = __importDefault(require("./judicial-obs-file.model"));
const ext_product_name_model_1 = __importDefault(require("./ext-product-name.model"));
const judicial_binnacle_model_1 = __importDefault(require("./judicial-binnacle.model"));
const judicial_bin_procedural_stage_model_1 = __importDefault(require("./judicial-bin-procedural-stage.model"));
const judicial_bin_defendant_procedural_action_model_1 = __importDefault(require("./judicial-bin-defendant-procedural-action.model"));
const judicial_bin_type_binnacle_model_1 = __importDefault(require("./judicial-bin-type-binnacle.model"));
const judicial_bin_file_model_1 = __importDefault(require("./judicial-bin-file.model"));
const judicial_process_reason_model_1 = __importDefault(require("./judicial-process-reason.model"));
const { Customer, CustomerSchema } = customer_model_1.default;
const { Funcionario, FuncionarioSchema } = funcionario_model_1.default;
const { Bank, BankSchema } = bank_model_1.default;
const { Module, ModuleSchema } = module_model_1.default;
const { CustomerUser, CustomerUserSchema } = customer_user_model_1.default;
const { City, CitySchema } = city_model_1.default;
const { Client, ClientSchema } = client_model_1.default;
const { UserApp, UserAppSchema } = user_app_model_1.default;
const { Direction, DirectionSchema } = direction_model_1.default;
// const { Guarantor, GuarantorSchema } = guarantorModel;
const { ManagementAction, ManagementActionSchema } = management_action_model_1.default;
const { Comment, CommentSchema } = comment_model_1.default;
const { ExtAddress, ExtAddressTypeSchema } = ext_address_type_model_1.default;
const { ExtContact, ExtContactSchema } = ext_contacts_model_1.default;
const { ExtTagGroup, ExtTagGroupSchema } = ext_tag_group_model_1.default;
const { ExtTag, ExtTagSchema } = ext_tag_model_1.default;
const { File, FileSchema } = file_model_1.default;
const { Negotiation, NegotiationSchema } = negotiation_model_1.default;
const { Template, TemplateSchema } = template_model_1.default;
const { ECampo, ECampoSchema } = ecampo_model_1.default;
const { TemplateHasValues, TemplateHasValuesSchema } = template_has_values_model_1.default;
const { Values, ValuesSchema } = values_model_1.default;
const { CustomerHasBank, CustomerHasBankSchema } = customer_has_bank_model_1.default;
const { TemplateImg, TemplateImgSchema } = template_img_model_1.default;
const { Product, ProductSchema } = product_model_1.default;
const { Goal, GoalSchema } = goal_model_1.default;
const { GoalUser, GoalUserSchema } = goal_user_model_1.default;
const { Role, RoleSchema } = roles_model_1.default;
const { Permission, PermissionSchema } = permission_model_1.default;
const { RolePermission, RolePermissionSchema } = role_permission_model_1.default;
const { JudicialSubject, JudicialSubjectSchema } = judicial_subject_model_1.default;
const { JudicialCourt, JudicialCourtSchema } = judicial_court_model_1.default;
const { JudicialProceduralWay, JudicialProceduralWaySchema } = judicial_procedural_way_model_1.default;
const { UserLog, UserLogSchema } = user_log_model_1.default;
const { JudicialCaseFile, JudicialCaseFileSchema } = judicial_case_file_model_1.default;
const { ExtIpAddressBank, ExtIpAddressBankSchema } = ext_ip_address_bank_model_1.default;
const { ExtContactType, ExtContactTypeSchema } = ext_contact_type_model_1.default;
const { JudicialObsType, JudicialObsTypeSchema } = judicial_obs_type_model_1.default;
const { JudicialObservation, JudicialObservationSchema } = judicial_observation_model_1.default;
const { JudicialObsFile, JudicialObsFileSchema } = judicial_obs_file_model_1.default;
const { ExtProductName, ExtProductNameSchema } = ext_product_name_model_1.default;
const { JudicialBinnacle, JudicialBinnacleSchema } = judicial_binnacle_model_1.default;
const { JudicialBinProceduralStage, JudicialBinProceduralStageSchema } = judicial_bin_procedural_stage_model_1.default;
const { JudicialBinDefendantProceduralAction, JudicialBinDefendantProceduralActionSchema, } = judicial_bin_defendant_procedural_action_model_1.default;
const { JudicialBinTypeBinnacle, JudicialBinTypeBinnacleSchema } = judicial_bin_type_binnacle_model_1.default;
const { JudicialBinFile, JudicialBinFileSchema } = judicial_bin_file_model_1.default;
const { JudicialProcessReason, JudicialProcessReasonSchema } = judicial_process_reason_model_1.default;
const setupModels = (sequelize) => {
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Bank.init(BankSchema, Bank.config(sequelize));
    Module.init(ModuleSchema, Module.config(sequelize));
    CustomerUser.init(CustomerUserSchema, CustomerUser.config(sequelize));
    City.init(CitySchema, City.config(sequelize));
    Client.init(ClientSchema, Client.config(sequelize));
    File.init(FileSchema, File.config(sequelize));
    UserApp.init(UserAppSchema, UserApp.config(sequelize));
    Direction.init(DirectionSchema, Direction.config(sequelize));
    // Guarantor.init(GuarantorSchema, Guarantor.config(sequelize));
    ManagementAction.init(ManagementActionSchema, ManagementAction.config(sequelize));
    Comment.init(CommentSchema, Comment.config(sequelize));
    ExtAddress.init(ExtAddressTypeSchema, ExtAddress.config(sequelize));
    ExtContact.init(ExtContactSchema, ExtContact.config(sequelize));
    ExtTagGroup.init(ExtTagGroupSchema, ExtTagGroup.config(sequelize));
    ExtTag.init(ExtTagSchema, ExtTag.config(sequelize));
    CustomerHasBank.init(CustomerHasBankSchema, CustomerHasBank.config(sequelize));
    Funcionario.init(FuncionarioSchema, Funcionario.config(sequelize));
    Negotiation.init(NegotiationSchema, Negotiation.config(sequelize));
    Template.init(TemplateSchema, Template.config(sequelize));
    ECampo.init(ECampoSchema, ECampo.config(sequelize));
    TemplateHasValues.init(TemplateHasValuesSchema, TemplateHasValues.config(sequelize));
    Values.init(ValuesSchema, Values.config(sequelize));
    TemplateImg.init(TemplateImgSchema, TemplateImg.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Goal.init(GoalSchema, Goal.config(sequelize));
    GoalUser.init(GoalUserSchema, GoalUser.config(sequelize));
    Role.init(RoleSchema, Role.config(sequelize));
    Permission.init(PermissionSchema, Permission.config(sequelize));
    RolePermission.init(RolePermissionSchema, RolePermission.config(sequelize));
    JudicialSubject.init(JudicialSubjectSchema, JudicialSubject.config(sequelize));
    JudicialCourt.init(JudicialCourtSchema, JudicialCourt.config(sequelize));
    JudicialProceduralWay.init(JudicialProceduralWaySchema, JudicialProceduralWay.config(sequelize));
    JudicialCaseFile.init(JudicialCaseFileSchema, JudicialCaseFile.config(sequelize));
    UserLog.init(UserLogSchema, UserLog.config(sequelize));
    ExtIpAddressBank.init(ExtIpAddressBankSchema, ExtIpAddressBank.config(sequelize));
    ExtContactType.init(ExtContactTypeSchema, ExtContactType.config(sequelize));
    JudicialObsType.init(JudicialObsTypeSchema, JudicialObsType.config(sequelize));
    JudicialObservation.init(JudicialObservationSchema, JudicialObservation.config(sequelize));
    JudicialObsFile.init(JudicialObsFileSchema, JudicialObsFile.config(sequelize));
    ExtProductName.init(ExtProductNameSchema, ExtProductName.config(sequelize));
    JudicialBinnacle.init(JudicialBinnacleSchema, JudicialBinnacle.config(sequelize));
    JudicialBinProceduralStage.init(JudicialBinProceduralStageSchema, JudicialBinProceduralStage.config(sequelize));
    JudicialBinDefendantProceduralAction.init(JudicialBinDefendantProceduralActionSchema, JudicialBinDefendantProceduralAction.config(sequelize));
    JudicialBinTypeBinnacle.init(JudicialBinTypeBinnacleSchema, JudicialBinTypeBinnacle.config(sequelize));
    JudicialBinFile.init(JudicialBinFileSchema, JudicialBinFile.config(sequelize));
    JudicialProcessReason.init(JudicialProcessReasonSchema, JudicialProcessReason.config(sequelize));
    Customer.associate(sequelize.models);
    CustomerUser.associate(sequelize.models);
    Bank.associate(sequelize.models);
    City.associate(sequelize.models);
    Client.associate(sequelize.models);
    File.associate(sequelize.models);
    ManagementAction.associate(sequelize.models);
    Comment.associate(sequelize.models);
    CustomerHasBank.associate(sequelize.models);
    ExtAddress.associate(sequelize.models);
    ExtContact.associate(sequelize.models);
    ExtTagGroup.associate(sequelize.models);
    ExtTag.associate(sequelize.models);
    Direction.associate(sequelize.models);
    // Guarantor.associate(sequelize.models);
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
    Role.associate(sequelize.models);
    Permission.associate(sequelize.models);
    RolePermission.associate(sequelize.models);
    JudicialCourt.associate(sequelize.models);
    JudicialSubject.associate(sequelize.models);
    JudicialProceduralWay.associate(sequelize.models);
    JudicialCaseFile.associate(sequelize.models);
    JudicialProcessReason.associate(sequelize.models);
    UserLog.associate(sequelize.models);
    ExtIpAddressBank.associate(sequelize.models);
    ExtContactType.associate(sequelize.models);
    JudicialObsType.associate(sequelize.models);
    JudicialObservation.associate(sequelize.models);
    JudicialObsFile.associate(sequelize.models);
    ExtProductName.associate(sequelize.models);
    JudicialBinnacle.associate(sequelize.models);
    JudicialBinProceduralStage.associate(sequelize.models);
    JudicialBinDefendantProceduralAction.associate(sequelize.models);
    JudicialBinTypeBinnacle.associate(sequelize.models);
    JudicialBinFile.associate(sequelize.models);
};
exports.setupModels = setupModels;
