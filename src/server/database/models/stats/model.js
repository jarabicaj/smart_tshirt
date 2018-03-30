import mongoose from "mongoose";

const statsSchema = mongoose.Schema({
  // User for which the values are stored
  userId: mongoose.Schema.Types.ObjectId,
  // Start of monitoring
  from: Date,
  // End of monitoring
  to: Date,
  // Values bulk
  values: mongoose.Schema.Types.ObjectId,
});

const Stats = mongoose.model("Stats", statsSchema);

export default Stats;


