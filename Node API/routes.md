# Movies

## List movies (supporting paging, filtering and sorting)

HTTP Method: GET
HTTP Path: /movies?limit=limit&offset=offset&filter=filter&sortField=sortField&sortDirection=sortDirection
Path Parameters: None
Query parameters:
    - limit: Number
    - offset: Number
    - filter: String
    - sortField: String
    - sortDirection: String
HTTP response codes: 200, 400, 404, 500
Success response schema: [
    { 
        id: Number,
        title: String,
        releaseDate: Date,
        duration: Number,
        actors: [String],
        genres: [String],
        director: String,
        description: String,
        rating: Number,
        posterUrl: String,
        trailerUrl: String,
        createdAt: Date,
        updatedAt: Date
    }
]
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}

## Get Movie

HTTP Method: GET
HTTP Path: /movies/movieId
Path Parameters: {
    movieId: Number
}
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: { 
    id: Number,
    title: String,
    releaseDate: Date,
    duration: Number,
    actors: [String],
    genres: [String],
    director: String,
    description: String,
    rating: Number,
    posterUrl: String,
    trailerUrl: String,
    createdAt: Date,
    updatedAt: Date
}
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}

# Lists

## Get user lists

HTTP Method: GET
HTTP Path: /lists
Path Parameters: None
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: [
    { 
        id: Number,
        name: String,
        description: String,
        movies: [Movie],
        createdAt: Date,
        updatedAt: Date
    }
]
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}

## Create List

HTTP Method: POST
HTTP Path: /lists
Path Parameters: None
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: 
    { 
        id: Number,
        name: String,
        description: String,
        movies: [Movie],
        createdAt: Date,
        updatedAt: Date
    }
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}

## Get List

HTTP Method: GET
HTTP Path: /lists/listId
Path Parameters: {
    listId: Number,
}
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: 
    { 
        id: Number,
        name: String,
        description: String,
        movies: [Movie],
        createdAt: Date,
        updatedAt: Date
    }
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}

## Update List

HTTP Method: PUT
HTTP Path: /lists/listId
Path Parameters: {
    listId: Number
}
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: 
    { 
        id: Number,
        name: String,
        description: String,
        movies: [Movie],
        createdAt: Date,
        updatedAt: Date
    }
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}

## Delete List

HTTP Method: DELETE
HTTP Path: /lists/listId
Path Parameters: {
    listId: Number
}
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: 
    { 
        id: Number,
        name: String,
        description: String,
        movies: [Movie],
        createdAt: Date,
        updatedAt: Date
    }
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}

## Add movie to list

HTTP Method: POST
HTTP Path: /lists/listId
Path Parameters: {
    listId: Number,
}
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: { 
    id: Number,
    name: String,
    description: String,
    movies: [Movie],
    createdAt: Date,
    updatedAt: Date
}
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}

## Remove movie from list

HTTP Method: DELETE
HTTP Path: /lists/listId
Path Parameters: {
    listId: Number,
}
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: { 
    id: Number,
    name: String,
    description: String,
    movies: [Movie],
    createdAt: Date,
    updatedAt: Date
}
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}


# Genres

## Get genres

HTTP Method: GET
HTTP Path: /genres
Path Parameters: None
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: [
    { 
        id: Number,
        genre: String 
    }
]
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}


# Users Profile

## Get user profile

HTTP Method: GET
HTTP Path: /user
Path Parameters: None
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: { 
    id: Number,
    name: String,
    email: String,
    photoUrl: String,
    createdAt: Date,
    updatedAt: Date
}
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}

## Update user profile

HTTP Method: PUT
HTTP Path: /user
Path Parameters: None
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: { 
    id: Number,
    name: String,
    email: String,
    photoUrl: String,
    createdAt: Date,
    updatedAt: Date
}
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}

## Upload user photo

HTTP Method: POST
HTTP Path: /user/photo
Path Parameters: None
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: { 
    id: Number,
    name: String,
    email: String,
    photoUrl: String,
    createdAt: Date,
    updatedAt: Date
}
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}

## Remove user photo

HTTP Method: DELETE
HTTP Path: /user/photo
Path Parameters: None 
Query parameters: None
HTTP response codes: 200, 400, 404, 500
Success response schema: { 
    id: Number,
    name: String,
    email: String,
    photoUrl: String,
    createdAt: Date,
    updatedAt: Date
}
Error response schema: { 
    errorMessage: String, 
    errorCode: Number
}
