import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the category"],
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
