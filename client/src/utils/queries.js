import { gql } from '@apollo/client';

// Define the GET_ME query
export const GET_ME = gql`
  query me {
    me {
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
