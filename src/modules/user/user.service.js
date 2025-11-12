export const getProfile = async (req, res, next) => {
  try {
    //get data from req
    const userExist = req.user;
    return res.status(200).json({ succeess: true, data: userExist });
  } catch (error) {
    return res
      .status(500)
      .json({ succeess: false, message: error.message, error });
  }
};
