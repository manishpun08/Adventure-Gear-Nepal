import { registerUserValidationSchema } from "../user/user.validation.js";

export const userReqBodyValidation = async (req, res, next) => {
  // extract new user from req.body
  const newUser = req.body;
  // validate new user
  try {
    const validatedData = await registerUserValidationSchema.validate(newUser);
    req.body = validatedData;
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
