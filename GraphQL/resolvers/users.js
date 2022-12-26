import User from "../models/user.js";

const resolvers = {
  Date: GraphQLDateTime,
  Query: {
    getUsers: () => users,
  },
  Mutation: {
    createUser: (root, args) => {
      if (users.find((u) => u.email === args.email)) {
        throw new Error("User already exists!");
      }
      const user = { ...args, id: uuid() };

      users.push(user);

      return user;
    },
    updateUser: (root, args) => {
      const userIndex = movies.findIndex(
        (m) => m.id.toString() === args.id.toString()
      );

      if (userIndex === -1) {
        return null;
      }

      const user = users[userIndex];
      const updatedUser = { ...user, ...args };
      users[userIndex] = updatedUser;

      return updatedUser;
    },
  },
};

export default resolvers;
