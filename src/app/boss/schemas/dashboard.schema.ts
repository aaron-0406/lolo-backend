import Joi from "joi";
import {
  ProductType,
  ProductTypeName,
} from "../../customers/types/product.tyoe";
import { ClientType } from "../../extrajudicial/types/client.type";

const file = Joi.string().required().messages({
  "any.required": "Se debe mandar un archivo",
});

const customerId = Joi.number().required().messages({
  "any.required": "Se debe mandar un archivo",
});

export const excelFileSchema = Joi.object<
  { file: string; customerId: number },
  true
>({
  file,
  customerId,
});

interface Client {
  name: string;
  code: string;
  funcionarioId: number;
  cityId: number;
}

interface Product {
  name: string;
  code: string;
  clientName: string;
  clientCode: string;
  state: string;
  customerId: number;
}

const clientSchema = Joi.object<Client, true>({
  name: Joi.string().required(),
  code: Joi.string().required(),
  funcionarioId: Joi.number().required(),
  cityId: Joi.number().required(),
});

const productSchema = Joi.object<Product, true>({
  name: Joi.string().required(),
  code: Joi.string().required(),
  clientName: Joi.string().required(),
  state: Joi.string().empty().allow("").required(),
  clientCode: Joi.string().required(),
  customerId: Joi.number().integer().required(),
});

export const createClientsSchema = Joi.object<
  {
    clients: Client[];
    customerUserId: number;
    customerHasBankId: number;
    idBank: number;
  },
  true
>({
  clients: Joi.array().items(clientSchema).min(1),
  customerUserId: Joi.number().required(),
  customerHasBankId: Joi.number().required(),
  idBank: Joi.number().required(),
});

export const deleteClientsSchema = Joi.object<
  { clients: string[]; customerHasBankId: number; idBank: number },
  true
>({
  clients: Joi.array().items(Joi.number().integer().positive()),
  customerHasBankId: Joi.number().required(),
  idBank: Joi.number().required(),
});

export const createProductSchema = Joi.object<
  {
    products: Product[];
    customerUserId: number;
    customerHasBankId: number;
    idBank: number;
  },
  true
>({
  products: Joi.array().items(productSchema).min(1),
  customerUserId: Joi.number().required(),
  customerHasBankId: Joi.number().required(),
  idBank: Joi.number().required(),
});

export const deleteProductSchema = Joi.object<{ products: string[] }, true>({
  products: Joi.array().items(Joi.string()),
});

export const sendXlsxEmail = Joi.object<
  {
    usersId: number[];
    clientsAdded: ProductTypeName[];
    clientsDeleted: ClientType[];
    productsAdded: ProductTypeName[];
    productsDeleted: ProductType[];
    productsCastigo: ProductType[];
  },
  true
>({
  usersId: Joi.array().items(Joi.number()),
  clientsAdded: Joi.array().items(Joi.object<ProductTypeName>()),
  clientsDeleted: Joi.array().items(Joi.object<ClientType>()),
  productsAdded: Joi.array().items(Joi.object<ProductTypeName>()),
  productsCastigo: Joi.array().items(Joi.object<ProductType>()),
  productsDeleted: Joi.array().items(Joi.object<ProductType>()),
});
