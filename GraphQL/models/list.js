import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  public: {
    type: Boolean,
  },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

schema.plugin(uniqueValidator);

export default mongoose.model("List", schema);
