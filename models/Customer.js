import mongoose from "mongoose";

// Define the Customer schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // The name is required
  },
  dateOfBirth: {
    type: Date,
    required: true,  // The date of birth is required
  },
  memberNumber: {
    type: Number,
    required: true,  // The member number is required
    unique: true,    // Each customer must have a unique member number
    min: 1,          // Ensure the member number is at least 1
  },
  interests: {
    type: String,    // A string of comma-separated interests like "Travel, Food, Music"
    required: false, // This is optional
  },
}, {
  timestamps: true  // This will automatically add createdAt and updatedAt fields
});

// Create the Customer model from the schema
const Customer = mongoose.models.customer || mongoose.model("customer", customerSchema);

export default Customer;
