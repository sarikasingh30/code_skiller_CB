const express = require("express")
const app = express()
const PORT = 3030
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');
app.use(express.json())
app.use(express.static('public'));

// MOCK Data
const booksData = [
    { id: "1", title: "Make your Own Luck", author: "Bob" },
    { id: "2", title: "Can't Hurt Me", author: "David" },
    { id: "3", title: "Leader in You", author: "Dale Carnegie" },
];


// Define the GraphQL schema
const schema = buildSchema(`
    type Query {   
        hello: String
        greet(name: String!): String                        
        book(id: ID!): Book
        books: [Book!]!
    }

    type Book {
        id: ID!
        title: String!
        author: String!
    }
`);

const rootValue = {
    hello: () => "Hello, world!",
    greet: ({ name }) => `Hello, ${name}!`,
    book: ({ id }) => {
        try {
            const book = booksData.find((book) => book.id === id)
            if (!book) throw new Error('Book not found');
            return book;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching book data');
        }
    },
    books: () => booksData
};

app.use('/graphql', createHandler({ schema, rootValue }));

// Handling 404 Errors (Page Not Found)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Page not found' });
});

 // General error handling middleware
 app.use((err, req, res, next) => {
    console.error(err)       // Optionally log the error for debugging
    res.status(500).json({ error: 'Something went wrong!' })
})
app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`Listening on PORT: ${PORT}`)
    }
})