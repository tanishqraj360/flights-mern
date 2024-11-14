import { Flights } from "./flightSchema.js";

export const insertData = async (req, res) => {
  const { id, airline, source, destination, fare, duration } = req.body;

  if (!id || !airline || !source || !destination || !fare || !duration) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const flight = new Flights({
      id,
      airline,
      source,
      destination,
      fare,
      duration,
    });
    const result = await flight.save();
    res
      .status(201)
      .json({ message: "Flight inserted successfully", data: result });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Failed to insert data" });
  }
};

export const getData = async (req, res) => {
  const id = req.params.id;

  try {
    const flight = await Flights.findOne({ id });

    if (flight) {
      res.status(200).json({ message: "Flight found", data: flight });
    } else {
      res.status(404).json({ message: "Flight not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const updateData = async (req, res) => {
  const { id, airline, source, destination, fare, duration } = req.body;

  try {
    const result = await Flights.updateOne(
      { id },
      { airline, source, destination, fare, duration },
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Flight updated successfully" });
    } else {
      res.status(404).json({ message: "Flight not found" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Failed to update data" });
  }
};

export const deleteData = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Flights.deleteOne({ id });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Flight deleted successfully" });
    } else {
      res.status(404).json({ message: "Flight not found" });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "Failed to delete data" });
  }
};
