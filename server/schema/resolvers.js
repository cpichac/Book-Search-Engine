const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // get a single user by either their id or their username
    getSingleUser: async (_, { id, username }) => {
      try {
        const foundUser = await User.findOne({
          $or: [{ _id: id }, { username }],
        });

        if (!foundUser) {
          throw new Error('Cannot find a user with this id or username');
        }

        return foundUser;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Mutation: {
    // create a user, sign a token, and send it back
    createUser: async (_, { input }) => {
      try {
        const user = await User.create(input);

        if (!user) {
          throw new Error('Something went wrong while creating the user');
        }

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    // login a user, sign a token, and send it back
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({
          $or: [{ username: input.username }, { email: input.email }],
        });

        if (!user) {
          throw new Error("Can't find this user");
        }

        const correctPw = await user.isCorrectPassword(input.password);

        if (!correctPw) {
          throw new Error('Wrong password');
        }

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    // save a book to a user's `savedBooks` field
    saveBook: async (_, { input, userId }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          throw new Error("Couldn't find user with this id");
        }

        return updatedUser;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    // remove a book from `savedBooks`
    deleteBook: async (_, { bookId, userId }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        if (!updatedUser) {
          throw new Error("Couldn't find user with this id");
        }

        return updatedUser;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

module.exports = resolvers;
