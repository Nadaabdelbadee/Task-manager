import joi from "joi";
export const subTValid = joi
  .object({
    subName: joi.string().required(),
    mainTaskId: joi.string().hex().length(24).required(),
  })
  .required();

export const getSTValid = joi
  .object({
    id: joi.string().hex().length(24).required(),
  })
  .required();
export const updateSTValid = joi
  .object({
    id: joi.string().hex().length(24).required(),
    mainTaskId: joi.string().hex().length(24).required(),
    subName: joi.string().required(),
  })
  .required();
export const sDateSTValid = joi
  .object({
    id: joi.string().hex().length(24).required(),
    startDate: joi.date().min("now").required(),
  })
  .required();
export const eDateSTValid = joi
  .object({
    id: joi.string().hex().length(24).required(),
    endDate: joi.date().required(),
  })
  .required();
export const IDSTValid = joi
  .object({
    id: joi.string().hex().length(24).required(),
  })
  .required();
