export const typeDef = `
    # Input definitions

    input ListInput {
        name: String!
        description: String
        public: Boolean!
        movies: [MovieInput]!
        user: UserInput
    }

    # Type definitions

    type List {
        name: String!
        description: String
        public: Boolean!
        movies: [Movie]!
        user: User
    }
`;
