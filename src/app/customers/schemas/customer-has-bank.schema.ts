import Joi from "joi";
import { CustomerHasBankType } from "../types/customer-has-bank";

const id = Joi.number();
const idCustomer = Joi.number();
const idBank = Joi.number();
const createAt = Joi.date();

const createCustomerHasBankSchema = Joi.object<CustomerHasBankType, true>({
  id: id.required(),
  idCustomer: idCustomer.required(),
  idBank: idBank.required(),
  createdAt: createAt.optional(),
});

const getCustomerHasBankSchema = Joi.object<
  { idCustomer: number; idBank: number },
  true
>({
  idCustomer: idCustomer.required(),
  idBank: idBank.required(),
});

export default { createCustomerHasBankSchema, getCustomerHasBankSchema };
