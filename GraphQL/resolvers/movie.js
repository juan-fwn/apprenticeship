import pkg from "graphql-iso-date";
const { GraphQLDateTime } = pkg;

import Movie from "../models/movie.js";

const genres = [
  {id: 1, name: "ACTION"},
  {id: 2, name: "THRILLER"},
  {id: 3, name: "TERROR"},
  {id: 4, name: "COMEDY"},
  {id: 5, name: "DRAMA"},
];

const resolvers = {
  Date: GraphQLDateTime,
  Query: {
    getGenres: () => genres,
    getMovies: async () => Movie.find({}),
    getMovie: async (root, args) => {
      const { genre: { name: genre } = {}, title } = args;

      if (genre) {
        return Movie.findOne({ genre });
      } else if (title) {
        return Movie.findOne({ title });
      } else {
        return null;
      }
    },
  },
  Mutation: {
    createMovie: async (root, args) => {
        const movie = new Movie({ title: args.title, ...args.movie });
  
        try {
          await movie.save();
        } catch (error) {
          return error;
        }
  
        return movie;
      },
      updateMovie: async (root, args) => {
        let movie = await Movie.findOne({ _id: args.id.toString() });
  
        if (!movie) return null;
  
        for (const [key, value] of Object.entries(args.movie)) {
          if (!value) {
            continue;
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
      deleteMovie: async (root, args) => {
        let movie = null;
  
        try {
          movie = await Movie.findOneAndDelete({ _id: args.id.toString() });
        } catch (error) {
          return error;
        }
  
        return movie;
      },
  }
};

export default resolvers;