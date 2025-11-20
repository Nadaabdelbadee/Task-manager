import joi from "joi";
import { Gender } from "../../enums.js";

export const registerSchema = joi
  .object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
    cPassword: joi.string().valid(joi.ref("password")).required(),
    birthOfDate: joi.string().isoDate(),
    gender: joi.string().valid(...Object.values(Gender)),
  })
  .required();

export const loginSchema = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();
