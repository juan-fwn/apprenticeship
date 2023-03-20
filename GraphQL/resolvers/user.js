import { GraphQLError } from "graphql";
import { getUserData, getMoviesData } from "./list.js";
import crypto from "crypto";
import User from "../models/user.js";
import List from "../models/list.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const comparePasswords = (salt, prevHash, password) => {
  const newHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return prevHash === newHash;
};

export const checkUserLogged = (context) => {
  const { currentUser } = context ?? {};

  if (!currentUser)
    throw new GraphQLError("User is not logged in", {
      extensions: {
        code: "BAD_USER_LOGIN",
      },
    });
};

const getListsData = async (listIds) => {
  const lists = await List.find({ _id: { $in: listIds } });

  for (const list of lists) {
    const user = await getUserData(list.user);
    const movies = await getMoviesData(list.movies);

    list["user"] = user;
    list["movies"] = movies;
  }

  return lists;
};

const findDuplicateUser = async (email) => {
  const user = User.findOne({ email });

  return Boolean(user);
};

const resolvers = {
  Query: {
    getUsers: async (root, args, context) => {
      const users = await User.find();

      if (!users) {
        return [];
      }

      for (const user of users) {
        if (!user.lists) continue;

        const lists = await getListsData(user.lists);
        user["lists"] = lists;
      }

      return users;
    },
    getUser: async (root, args, context) => {
      checkUserLogged(context);

      const user = await User.findOne({ _id: args.id.toString() });

      if (!user) return null;

      return user;
    },
  },
  Mutation: {
    createUser: async (root, args, context) => {
      const password_salt = crypto.randomBytes(16).toString("hex");
      const password_hash = crypto
        .pbkdf2Sync(args.user.password, password_salt, 1000, 64, `sha512`)
        .toString(`hex`);

      if (findDuplicateUser(args.user.email)) {
        throw new GraphQLError("Email already exists", {
          extensions: {
            code: "DUPLICATE_EMAIL",
          },
        });
      }

      const user = new User({
        ...args.user,
        password_salt,
        password_hash,
      });

      try {
        await user.save();
      } catch (error) {
        return error;
      }

      return user;
    },
    updateUser: async (root, args, context) => {
      checkUserLogged(context);

      let user = await User.findOne({ _id: args.id.toString() });

      if (!user) return null;

      const arePasswordsEqual = comparePasswords(
        user.password_salt,
        user.password_hash,
        args.user.password
      );

      if (!arePasswordsEqual)
        throw new GraphQLError("Invalid password", {
          extensions: {
            code: "INCORRECT_PASSWORD",
          },
        });

      for (const [key, value] of Object.entries(args.user)) {
        if (key === "lists") {
          const lists = await getListsData(args.user.lists);

          user["lists"] = lists;
        } else {
          user[key] = value;
        }
      }

      try {
        await user.save();
      } catch (error) {
        return error;
      }

      return user;
    },
    deleteUser: async (root, args, context) => {
      checkUserLogged(context);

      let user = null;

      try {
        return await User.findOneAndDelete({ _id: args.id.toString() });
      } catch (error) {
        return error;
      }
    },
    login: async (root, args) => {
      console.log(args);
      let user = await User.findOne({ email: args.email });

      if (!user)
        throw new GraphQLError("Invalid user", {
          extensions: {
            code: "INCORRECT_USER",
          },
        });

      const arePasswordsEqual = comparePasswords(
        user.password_salt,
        user.password_hash,
        args.password
      );

      if (!arePasswordsEqual)
        throw new GraphQLError("Invalid password", {
          extensions: {
            code: "INCORRECT_PASSWORD",
          },
        });

      const userForToken = {
        id: user._id,
        email: user.email,
      };

      const token = jwt.sign(userForToken, process.env.JWT_SECRET);

      return token;
    },
  },
};

export default resolvers;
