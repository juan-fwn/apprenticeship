import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import "./db.js";
import { typeDef as Movie } from "./typeDef/movie.js";
import { typeDef as User } from "./typeDef/user.js";
import { typeDef as List } from "./typeDef/list.js";
import movieResolvers from "./resolvers/movie.js";
import useresolvers from "./resolvers/user.js";
import listResolvers from "./resolvers/list.js";
import UserModel from "./models/user.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config();

const schema = makeExecutableSchema({
  typeDefs: [Movie, User, List],
  resolvers: [movieResolvers, useresolvers, listResolvers],
});

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema,
    preserveResolvers: true,
  }),
  context: async ({ req }) => {
    const auth = req ? req.headers?.authorization : null;

    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const token = auth.substring(7);
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await UserModel.findById(ObjectId(id));

      return { currentUser };
    }

    return {};
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
