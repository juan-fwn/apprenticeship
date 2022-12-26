export const typeDef = `
    # Define Scalars

    scalar Date

    # Enums definitions

    enum AllowedGenders {
        ACTION
        THRILLER
        TERROR
        COMEDY
        DRAMA
    }

    # Input definitions

    input GenreInput {
        name: AllowedGenders!
    }

    input VideoInput {
        ize: Int!
        type: String!
        url: String!
    }

    input MovieInput {
        tagline: String
        overview: String
        release_date: Date
        poster_url: String
        backdrop_url: String
        imdb_id: String
        video: [VideoInput]
        genre: [GenreInput]
    }

    # Type definitions
    
    type Video {
        id: ID!
        size: Int!
        type: String!
        url: String!
    }

    type Genre {
        id: ID!
        name: AllowedGenders!
    }

    type Movie {
        id: ID!
        title: String!
        tagline: String
        overview: String
        release_date: Date
        poster_url: String
        backdrop_url: String
        imdb_id: String
        video: [Video]
        genre: [Genre]
    }

    # Queries

    type Query {
        getMovies: [Movie]!
        getMovie(genre: GenreInput, title: String): Movie
        getGenres: [Genre]!
    }

    # Mutations

    type Mutation {
        createMovie(
            title: String!,
            movie: MovieInput
        ): Movie
        updateMovie(
            id: ID!
            movie: MovieInput
        ): Movie
        deleteMovie(id: ID!): Movie
    }
`;
