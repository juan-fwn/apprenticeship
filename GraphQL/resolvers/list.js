import { GraphQLError } from "graphql";
import { ObjectId } from "mongodb";
import List from "../models/list.js";
import User from "../models/user.js";
import Movie from "../models/movie.js";
import { checkUserLogged } from "./user.js";

const findDuplicateList = async (listName, userId) => {
  const lists = await List.find({
    name: listName,
    "user": ObjectId(userId),
  });

  return lists.length > 0;
};

export const getUserData = async (userId) => {
  const user = await User.findOne({ _id: ObjectId(userId) });

  return user;
};

export const getMoviesData = async (moviesIds) => {
  const movies = await Movie.find({ _id: { $in: moviesIds } });

  return movies;
};

const resolvers = {
  Query: {
    getLists: async (root, args, context) => {
      checkUserLogged(context);

      const lists = await List.find();

      for (const list of lists) {
        const user = await getUserData(list.user);
        const movies = await getMoviesData(list.movies);

        list["user"] = user;
        list["movies"] = movies;
      }

      return lists;
    },
  },
  Mutation: {
    createList: async (root, args, context) => {
      checkUserLogged(context);

      let user = null;
      let movies = [];

      if (args.user) {
        const duplicateList = await findDuplicateList(
          args.name,
          args.user.toString()
        );

        if (duplicateList) {
          throw new GraphQLError("Duplicate List Name", {
            extensions: {
              code: "DUPLICATE_LIST_NAME",
            },
          });
        }
        user = await User.findOne({ _id: ObjectId(args.user) });
      }
      if (args.movies) {
        movies = await Movie.find({ _id: { $in: args.movies } });
      }

      const list = new List({
        ...args.list,
        name: args.name,
        movies,
        user,
      });

      try {
        await list.save();
      } catch (error) {
        return error;
      }

      return list;
    },
    updateList: async (root, args, context) => {
      checkUserLogged(context);

      let list = await List.findOne({ _id: ObjectId(args.id) });

      if (!list) return null;

      for (const [key, value] of Object.entries(args.list)) {
        if (key === "user") {
          list["user"] = await User.findOne({ _id: ObjectId(args.list.user) });
        } else if (key === "movies") {
          const movies = [];

          for (const movieId of value) {
            const movie = await Movie.findOne({ _id: ObjectId(movieId) });

            if (movie) movies.push(movie);
          }

          list["movies"] = [...movies];
        } else {
          list[key] = value;
        }
      }

      try {
        await list.save();
      } catch (error) {
        return error;
      }

      return list;
    },
    deleteList: async (root, args, context) => {
      checkUserLogged(context);

      let list = null;

      try {
        list = await List.findOne({ _id: ObjectId(args.id) });

        if (!list) {
          throw new GraphQLError("List not found", {
            extensions: {
              code: "LIST_NOT_FOUND",
            },
          });
        }

        const user = await getUserData(list.user);
        const movies = await getMoviesData(list.movies);

        list["user"] = user;
        list["movies"] = movies;

        await List.deleteOne({ _id: ObjectId(args.id) });
      } catch (error) {
        return error;
      }

      return list;
    },
  },
};

export default resolvers;
