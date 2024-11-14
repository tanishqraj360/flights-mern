import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  airline: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

export const Flights = mongoose.model("Flights", flightSchema);
