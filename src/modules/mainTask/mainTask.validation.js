import joi from "joi";
export const mainTValid = joi
  .object({
    TaskName: joi.string().required(),
    userId: joi.string().hex().length(24).required(),
  })
  .required();
export const IDMTaskValid = joi
  .object({
    id: joi.string().hex().length(24).required(),
  })
  .required();
export const sDateMainTValid = joi
  .object({
    id: joi.string().hex().length(24).required(),
    startDate: joi.date().min("now").required(),
  })
  .required();
export const eDateMainTValid = joi
  .object({
    id: joi.string().hex().length(24).required(),
    endDate: joi.date().required(),
  })
  .required();
export const updateMainTValid = joi
  .object({
    id: joi.string().hex().length(24).required(),
    TaskName: joi.string().required(),
  })
  .required();
