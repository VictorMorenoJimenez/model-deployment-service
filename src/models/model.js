import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
  inputName: String,
  outputName: String,
  inputSize: Number,
  outputSize: Number,
  resource: String,
});

const Model = mongoose.model('Model', modelSchema);

export default Model;
