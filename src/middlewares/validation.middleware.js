import joi from "joi";
import { Gender } from "../enums.js";

export const isValid = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body, { abortEarly: false });
    if (result.error) {
      let messages = result.error.details.map((obj) => obj.message);
      return next(new Error(messages, { cause: 400 }));
    }
    return next()
  };
};
