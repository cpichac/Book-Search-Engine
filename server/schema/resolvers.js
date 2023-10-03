const User = require('./models/User'); // Import your Mongoose User model

const resolvers = {
  Query: {
    // Query to fetch a user by ID
    getUserById: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
      }
    },
    
    // Query to fetch all users
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
      }
    },
  },
  
  Mutation: {
    // Mutation to create a new user
    createUser: async (_, { username, email }) => {
      try {
        const user = new User({ username, email });
        await user.save();
        return user;
      } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
