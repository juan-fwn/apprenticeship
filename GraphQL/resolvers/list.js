import { GraphQLError } from "graphql";
import { ObjectId } from "mongodb";
import List from "../models/list.js";
import User from "../models/user.js";
import Movie from "../models/movie.js";

const findDuplicateList = async (listName, userId) => {
  const lists = await List.find({
    name: listName,
    "user._id": ObjectId(userId),
  });

  return lists.length > 0;
};

const replaceIdKey = (list) => {
  delete Object.assign(list.user, { ["id"]: list["user"]["_id"] })["_id"];

  list.movies.forEach((movie) => {
    delete Object.assign(movie, { ["id"]: movie["_id"] })["_id"];
  });
};

const resolvers = {
  Query: {
    getLists: async () => {
      const lists = await List.find({});

      lists.forEach((list) => {
        replaceIdKey(list);
      });

      return lists;
    },
  },
  Mutation: {
    createList: async (root, args) => {
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
        user = (await User.findOne({ _id: ObjectId(args.user) })) ?? null;
      }
      if (args.movies) {
        movies = (await Movie.find({ _id: { $in: args.movies } })) ?? null;
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
    updateList: async (root, args) => {
      let list = await List.findOne({ _id: ObjectId(args.id) });

      if (!list) return null;

      for (const [key, value] of Object.entries(args.list)) {
        if (key === "user") {
          list["user"] =
            (await User.findOne({ _id: ObjectId(args.list.user) })) ?? null;
        } else if (key === "movies") {
          const movies = [];

          for (const movieId of value) {
            const movie =
              (await Movie.findOne({ _id: ObjectId(movieId) })) ?? null;

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
    deleteList: async (root, args) => {
      let list = null;

      try {
        list = await List.findOneAndDelete({ _id: ObjectId(args.id) });

        replaceIdKey(list);
      } catch (error) {
        return error;
      }

      return list;
    },
  },
};

export default resolvers;
