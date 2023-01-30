import { GraphQLError } from "graphql";
import crypto from "crypto";
import User from "../models/user.js";

const comparePasswords = (salt, prevHash, password) => {
  const newHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return prevHash === newHash;
};

const resolvers = {
  Query: {
    getUsers: async () => User.find({}),
    getUser: async (root, args) => {
      const user = await User.findOne({ _id: args.id.toString() });

      if (!user) return null;

      return user;
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const password_salt = crypto.randomBytes(16).toString("hex");
      const password_hash = crypto
        .pbkdf2Sync(args.user.password, password_salt, 1000, 64, `sha512`)
        .toString(`hex`);

      const user = new User({ ...args.user, password_salt, password_hash });

      try {
        await user.save();
      } catch (error) {
        return error;
      }

      return user;
    },
    updateUser: async (root, args) => {
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
        user[key] = value;
      }

      try {
        await user.save();
      } catch (error) {
        return error;
      }

      return user;
    },
    deleteUser: async (root, args) => {
      let user = null;

      try {
        user = await User.findOneAndDelete({ _id: args.id.toString() });
      } catch (error) {
        return error;
      }

      return user;
    },
  },
};

export default resolvers;
