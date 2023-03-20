import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
  },
  tagline: {
    type: String,
    minLength: 3,
  },
  overview: {
    type: String,
    minLength: 3,
  },
  release_date: {
    type: Date,
  },
  poster_url: {
    type: String,
    minLength: 7,
  },
  backdrop_url: {
    type: String,
    minLength: 7,
  },
  imdb_id: {
    type: String,
    minLength: 1,
  },
  video: {
    type: Object,
  },
  genre: {
    type: Object,
  },
});

schema.plugin(uniqueValidator);

export default mongoose.model("Movie", schema);
