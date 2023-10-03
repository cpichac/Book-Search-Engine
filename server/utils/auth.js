const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }, res, next) {
    // Extract the JWT token from the GraphQL request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'You have no token!' });
    }

    // Verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      next();
    } catch (error) {
      console.error('Invalid token:', error.message);
      return res.status(401).json({ message: 'Invalid token!' });
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
