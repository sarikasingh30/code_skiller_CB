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
    book: ({ id }) => booksData.find((book) => book.id === id),
    books: () => booksData
};

app.use('/graphql', createHandler({ schema, rootValue}));

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`Listening on PORT: ${PORT}`)
    }
})