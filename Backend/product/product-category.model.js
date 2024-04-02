import mongoose from "mongoose";

// set rule
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
});

// create table
const Category = mongoose.model("Category", categorySchema);

export default Category;
