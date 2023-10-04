import { gql } from '@apollo/client';

// Define the LOGIN_USER mutation
export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
      user {
        _id
        username
        email
        # Add other user fields as needed
      }
    }
  }
`;

// Define the ADD_USER mutation
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    createUser(input: { username: $username, email: $email, password: $password }) {
      token
      user {
        _id
        username
        email
        # Add other user fields as needed
      }
    }
  }
`;

// Define the SAVE_BOOK mutation
export const SAVE_BOOK = gql`
  mutation saveBook($input: SaveBookInput!, $userId: ID!) {
    saveBook(input: $input, userId: $userId) {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        # Add other book fields as needed
      }
    }
  }
`;

// Define the REMOVE_BOOK mutation
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!, $userId: ID!) {
    deleteBook(bookId: $bookId, userId: $userId) {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        # Add other book fields as needed
      }
    }
  }
`;
