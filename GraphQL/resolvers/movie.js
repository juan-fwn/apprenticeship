import pkg from "graphql-iso-date";
const { GraphQLDateTime } = pkg;
import { v1 as uuid } from "uuid";
import { checkUserLogged } from "./user.js";

import Movie from "../models/movie.js";

const genres = [
  { id: 1, name: "ACTION" },
  { id: 2, name: "THRILLER" },
  { id: 3, name: "TERROR" },
  { id: 4, name: "COMEDY" },
  { id: 5, name: "DRAMA" },
  { id: 6, name: "FANTASY" },
  { id: 7, name: "SCIFI" },
  { id: 8, name: "HISTORY" },
  { id: 9, name: "ROMANCE" },
  { id: 10, name: "MISTERY" },
  { id: 11, name: "HORROR" },
  { id: 12, name: "WAR" },
  { id: 13, name: "MUSICAL" },
  { id: 14, name: "SUPERHERO" },
  { id: 15, name: "ANIMATION" },
];

const resolvers = {
  Date: GraphQLDateTime,
  Query: {
    getGenres: (root, args, context) => {
      checkUserLogged(context);

      return genres;
    },
    getMovies: async (root, args, context) => {
      checkUserLogged(context);

      const { limit = 0, offset: skip = 0 } = args.pagination ?? {};

      return Movie.find().skip(skip).limit(limit);
    },
    getMovie: async (root, args, context) => {
      checkUserLogged(context);

      const { genre = {}, title } = args;
      const { name: genreName } = genre;

      if (genre) {
        return Movie.findOne({ genre: genreName });
      } else if (title) {
        return Movie.findOne({ title });
      } else {
        return null;
      }
    },
  },
  Mutation: {
    createMovie: async (root, args, context) => {
      checkUserLogged(context);

      const movie = new Movie({ title: args.title, ...args.movie });

      try {
        await movie.save();
      } catch (error) {
        return error;
      }

      return movie;
    },
    updateMovie: async (root, args, context) => {
      checkUserLogged(context);

      const movie = await Movie.findOne({ _id: args.id.toString() });

      if (!movie) return null;

      for (const [key, value] of Object.entries(args.movie)) {
        if (key === "genre") {
          const newGenres = [];

          value.forEach((newGenre) => {
            genres.forEach((genre) => {
              if (newGenre.name === genre.name) newGenres.push(genre);
            });
          });

          movie[key] = newGenres;
        } else if (key === "video") {
          movie[key] = { ...value, id: uuid() };
        } else {
          movie[key] = value;
        }
      }

      try {
        await movie.save();
      } catch (error) {
        return error;
      }

      return movie;
    },
    deleteMovie: async (root, args, context) => {
      checkUserLogged(context);

      let movie = null;

      try {
        movie = await Movie.findOneAndDelete({ _id: args.id.toString() });
      } catch (error) {
        return error;
      }

      return movie;
    },
  },
};

export default resolvers;
