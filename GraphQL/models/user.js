import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
  },
  full_name: {
    type: String,
    minLength: 2,
  },
  photo_path: {
    type: String,
    minLength: 1,
  },
  password_salt: {
    type: String,
    minLength: 7,
  },
  password_hash: {
    type: String,
    minLength: 7,
  },
  lists: {
    type: Object,
  },
});

schema.plugin(uniqueValidator);

export default mongoose.model("User", schema);
