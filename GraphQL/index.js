import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { makeExecutableSchema } from '@graphql-tools/schema'
import "./db.js";
import { typeDef as Movie } from "./typeDef/movie.js";
import { typeDef as User } from "./typeDef/user.js";
import { typeDef as List } from "./typeDef/list.js";
import movieResolvers from "./resolvers/movie.js";
// import userResolvers from "./resolvers/user.js";

const schema = makeExecutableSchema({
  typeDefs: [Movie, User, List],
  resolvers: [movieResolvers],
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
