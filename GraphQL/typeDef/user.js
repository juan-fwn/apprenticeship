export const typeDef = `
    # Input definitions

    input UserInput {
        email: String!
        full_name: String!
        photo_path: String
        password_salt: String!
        password_hash: String!
        lists: [ListInput]
    }

    # Type definitions
    
    type User {
        id: ID!
        email: String!
        full_name: String!
        photo_path: String
        password_salt: String!
        password_hash: String!
        lists: [List]
    }

    # Queries

    type Query {
        getUsers: [User]!
    }

    # Mutations

    type Mutation {
        createUser(
            user: UserInput
        ): User
        updateUser(
            user: UserInput
        ): User
        deleteUser(id: ID!): User
    }
`;
