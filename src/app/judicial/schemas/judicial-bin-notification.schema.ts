import joi from "joi";

const getAllNotificationsByBinnacleIdSchema = joi.object({
  binnacleId: joi.number().required(),
});

export default {
  getAllNotificationsByBinnacleIdSchema,
};