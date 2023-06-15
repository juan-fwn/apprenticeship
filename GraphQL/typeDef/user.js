export const typeDef = `
    # Input definitions

    input CreateUserInput {
        email: String!
        full_name: String!
        photo_path: String
        password: String!
    }

    input UpdateUserInput {
        email: String
        full_name: String
        photo_path: String
        password: String!
        lists: [ID]
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
        getUsers: [User]
        getUser(id: ID!): User
    }

    # Mutations

    type Mutation {
        createUser(
            user: CreateUserInput
        ): User
        updateUser(
            id: ID!
            user: UpdateUserInput
        ): User
        deleteUser(id: ID!): User
        login(
            email: String!
            password: String!
        ): String
    }
`;
