import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please entert the product name"],
  },
  description: {
    type: String,
    required: [true, "Please entert the description of the product"],
  },
  price: {
    type: Number,
    required: [true, "Please entert the price"],
  },
  available: {
    type: Boolean,
    required: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "A product must belong to a category"],
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
