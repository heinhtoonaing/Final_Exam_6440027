import mongoose, { model } from "mongoose";

const productSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { 
    type: Number, 
    required: true, 
    validate: {
      validator: (value) => value > 0,
      message: 'Price must be a positive number',
    },
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "category" 
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Product;
