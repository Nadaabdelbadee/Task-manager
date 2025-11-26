import joi from "joi";
export const mainTaskValidation = joi
  .object({
    TaskName: joi.string().required(),
    userId: joi.string().hex().length(24).required(),
    startDate: joi.string().isoDate(),
    endDate: joi.string().isoDate(),
  })
  .required();
export const IDMainTaskValidation = joi
  .object({
    id: joi.string().hex().length(24).required(),
  })
  .required();
export const updateMainTaskValidation = joi
  .object({
    id: joi.string().hex().length(24).required(),
    TaskName: joi.string().required(),
  })
  .required();
