import Joi from "joi";
import { CustomerHasBankType } from "../types/customer-has-bank";

const id = Joi.number();
const idCustomer = Joi.number();
const idBank = Joi.number();
const createAt = Joi.date();

const createCustomerHasBankSchema = Joi.object<
  Omit<CustomerHasBankType, "id">,
  true
>({
  idCustomer: idCustomer.required(),
  idBank: idBank.required(),
  createdAt: createAt.optional(),
});

const getCustomerHasBankByCustomerIdSchema = Joi.object<
  { idCustomer: number },
  true
>({
  idCustomer: idCustomer.required(),
});

const getCustomerHasBankByIdSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createCustomerHasBankSchema,
  getCustomerHasBankByCustomerIdSchema,
  getCustomerHasBankByIdSchema,
};
