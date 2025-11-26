import joi from "joi";
export const subTaskValidation = joi
  .object({
    subName: joi.string().required(),
    mainTaskId: joi.string().hex().length(24).required(),
  })
  .required();

export const getTaskValidation = joi
  .object({
    id: joi.string().hex().length(24).required(),
  })
  .required();
export const updateTaskValidation = joi
  .object({
    id: joi.string().hex().length(24).required(),
    subName: joi.string().required(),
  })
  .required();
export const IDTaskValidation = joi
  .object({
    id: joi.string().hex().length(24).required(),
  })
  .required();
