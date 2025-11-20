export const globalError = (error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json({ success: false, message: error.message, stack: error.stack });
};
