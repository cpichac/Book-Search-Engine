const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    # Add other user fields as needed
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    title: String!
    authors: [String]
    description: String!
    # Add other book fields as needed
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
    # Add other user input fields as needed
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input SaveBookInput {
    bookId: ID!
    title: String!
    authors: [String]
    description: String!
    # Add other book input fields as needed
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getSingleUser(id: ID, username: String): User
    # Define other queries here
  }

  type Mutation {
    createUser(input: CreateUserInput!): Auth
    login(input: LoginInput!): Auth
    saveBook(input: SaveBookInput!, userId: ID!): User
    deleteBook(bookId: ID!, userId: ID!): User
    # Define other mutations here
  }
`;

module.exports = typeDefs;
