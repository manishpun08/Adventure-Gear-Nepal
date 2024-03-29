import { registerAdminValidationSchema } from "../admin/admin.validation.js";

export const adminReqBodyValidation = async (req, res, next) => {
  // extract new user from req.body
  const newAdmin = req.body;
  // validate new user
  try {
    const validatedData = await registerAdminValidationSchema.validate(newAdmin);
    req.body = validatedData;
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
