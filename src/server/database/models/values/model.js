import mongoose from "mongoose";

const valuesSchema = mongoose.Schema({
  data: [
    {
      time: Date,
      value: Number
    }
  ]
});

const Values = mongoose.model("Values", valuesSchema);

export default Values;
