import crypto from "crypto";

export const generateRandomString = () => {
  return crypto.randomBytes(7).toString("hex");
};
