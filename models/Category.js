import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    min: 0,  // Optional, ensures that order is non-negative
  }
});

// Adding an index on the name field to optimize queries
categorySchema.index({ name: 1 });

const Category = mongoose.models.category || mongoose.model("category", categorySchema);

export default Category;
