import mongoose from "mongoose";

// set rule
const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 55,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});
// to remove password field.
adminSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

// create table
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
