import joi from "joi";
export const subTaskValidation = joi
  .object({
    subName: joi.string().required(),
    mainTaskId: joi.string().hex().length(24).required(),
    startDate: joi.string().isoDate(),
    endDate: joi.string().isoDate(),
  })
  .required();
