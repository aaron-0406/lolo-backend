"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const errorHandlers = {
    [sequelize_1.ValidationError.name]: (err) => {
        const customMessage = "Se produjo un error de validación.";
        const customErrors = err.errors.map((validationError) => ({
            field: validationError.path,
            message: `Validar los datos para el siguiente campo: ${validationError.path}.`,
        }));
        return { status: 409, message: customMessage, errors: customErrors };
    },
    [sequelize_1.UniqueConstraintError.name]: (err) => {
        const customMessage = "Se produjo un error de registro duplicado.";
        const customErrors = err.errors.map((uniqueError) => ({
            field: uniqueError.path,
            message: `Ya existe un registro en el campo ${uniqueError.path} con el valor ${uniqueError.value}.`,
        }));
        return { status: 409, message: customMessage, errors: customErrors };
    },
    [sequelize_1.ForeignKeyConstraintError.name]: (err) => {
        var _a;
        const customMessage = "No puedes actualizar o eliminar el registro porque está siendo usado.";
        const field = (_a = err.fields) === null || _a === void 0 ? void 0 : _a[0];
        const customErrors = [
            {
                field,
                message: `El campo ${field} tiene un registro que ya esta siendo usado.`,
            },
        ];
        return { status: 409, message: customMessage, errors: customErrors };
    },
    [sequelize_1.ConnectionError.name]: (err) => {
        const customMessage = "Se produjo un error de conexión a la base de datos.";
        return { status: 500, message: customMessage, errors: [] };
    },
    [sequelize_1.DatabaseError.name]: (err) => {
        const customMessage = "Se produjo un error en la base de datos.";
        return { status: 500, message: customMessage, errors: [] };
    },
    [sequelize_1.OptimisticLockError.name]: (err) => {
        const customMessage = "Se produjo un error de bloqueo optimista.";
        return { status: 409, message: customMessage, errors: [] };
    },
    [sequelize_1.TimeoutError.name]: (err) => {
        const customMessage = "Se produjo un error de tiempo de espera de la base de datos.";
        return { status: 500, message: customMessage, errors: [] };
    },
    [sequelize_1.ExclusionConstraintError.name]: (err) => {
        const customMessage = "Se produjo un error de restricción de exclusión.";
        return { status: 409, message: customMessage, errors: [] };
    },
    [sequelize_1.AssociationError.name]: (err) => {
        const customMessage = "Se produjo un error de asociación.";
        return { status: 500, message: customMessage, errors: [] };
    },
    [sequelize_1.BulkRecordError.name]: (err) => {
        const customMessage = "Se produjo un error de registro masivo.";
        return { status: 500, message: customMessage, errors: [] };
    },
};
exports.default = errorHandlers;
