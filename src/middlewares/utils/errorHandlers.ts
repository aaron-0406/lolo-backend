import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  ConnectionError,
  DatabaseError,
  OptimisticLockError,
  TimeoutError,
  ExclusionConstraintError,
  AssociationError,
  BulkRecordError,
} from "sequelize";

const errorHandlers: Record<
  string,
  (err: Error) => {
    status: number;
    message: string;
    errors: { field: string; message: string }[];
  }
> = {
  [ValidationError.name]: (err) => {
    const customMessage = "Se produjo un error de validación.";
    const customErrors = (err as ValidationError).errors.map(
      (validationError) => ({
        field: validationError.path as string,
        message: `Validar los datos para el siguiente campo: ${validationError.path}.`,
      })
    );
    return { status: 409, message: customMessage, errors: customErrors };
  },
  [UniqueConstraintError.name]: (err) => {
    const customMessage = "Se produjo un error de registro duplicado.";
    const customErrors = (err as UniqueConstraintError).errors.map(
      (uniqueError) => ({
        field: uniqueError.path as string,
        message: `Ya existe un registro en el campo ${uniqueError.path} con el valor ${uniqueError.value}.`,
      })
    );
    return { status: 409, message: customMessage, errors: customErrors };
  },
  [ForeignKeyConstraintError.name]: (err) => {
    const customMessage =
      "No puedes actualizar o eliminar el registro porque está siendo usado.";
    const field = (err as ForeignKeyConstraintError).fields?.[0] as string;
    const customErrors = [
      {
        field,
        message: `El campo ${field} tiene un registro que ya esta siendo usado.`,
      },
    ];
    return { status: 409, message: customMessage, errors: customErrors };
  },
  [ConnectionError.name]: (err) => {
    const customMessage = "Se produjo un error de conexión a la base de datos.";
    return { status: 500, message: customMessage, errors: [] };
  },
  [DatabaseError.name]: (err) => {
    const customMessage = "Se produjo un error en la base de datos.";
    return { status: 500, message: customMessage, errors: [] };
  },
  [OptimisticLockError.name]: (err) => {
    const customMessage = "Se produjo un error de bloqueo optimista.";
    return { status: 409, message: customMessage, errors: [] };
  },
  [TimeoutError.name]: (err) => {
    const customMessage =
      "Se produjo un error de tiempo de espera de la base de datos.";
    return { status: 500, message: customMessage, errors: [] };
  },
  [ExclusionConstraintError.name]: (err) => {
    const customMessage = "Se produjo un error de restricción de exclusión.";
    return { status: 409, message: customMessage, errors: [] };
  },
  [AssociationError.name]: (err) => {
    const customMessage = "Se produjo un error de asociación.";
    return { status: 500, message: customMessage, errors: [] };
  },
  [BulkRecordError.name]: (err) => {
    const customMessage = "Se produjo un error de registro masivo.";
    return { status: 500, message: customMessage, errors: [] };
  },
};

export default errorHandlers;
