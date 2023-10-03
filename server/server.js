const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // Pass the Express request object to the context
});

// Apply Apollo Server as middleware to Express
server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () =>
    console.log(`🚀 Server is running at http://localhost:${PORT}${server.graphqlPath}`)
  );
});
