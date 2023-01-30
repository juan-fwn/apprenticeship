import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema({
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
  movies: {
    type: Object,
  },
  user: {
    type: Object,
  },
});

schema.plugin(uniqueValidator);

export default mongoose.model("List", schema);
