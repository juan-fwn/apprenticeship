export const typeDef = `
    # Input definitions

    input ListInput {
        description: String
        public: Boolean
        movies: [ID]
        user: ID
    }

    # Type definitions

    type List {
        id: ID!
        name: String!
        description: String
        public: Boolean!
        movies: [Movie]!
        user: User
    }

    # Queries

    type Query {
        getLists: [List]
    }

    # Mutations

    type Mutation {
        createList(
            name: String!
            user: ID!
            movies: [ID]!
            list: ListInput
        ): List
        updateList(
            id: ID!
            list: ListInput
        ): List
        deleteList(id: ID!): List
    }
`;
