require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server");

const { createStore } = require("./utils");
const { merge } = require("lodash");

const RoomAPI = require("./datasources/room");
const { typeDef: Room, resolvers: roomResolvers } = require("./schemas/room");

const Query = gql`
  type Query {
    _empty: String
  }
`;
const store = createStore();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [Query, Room],
  resolvers: merge(roomResolvers),
  context: {},
  dataSources: () => ({
    roomAPI: new RoomAPI({ store }),
  }),
});

// The `listen` method launches a web server.
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
