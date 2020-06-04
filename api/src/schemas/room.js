const { gql } = require("apollo-server");
const { PostgresPubSub } = require("graphql-postgres-subscriptions");

const pubsub = new PostgresPubSub({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DB,
  password: process.env.DBPASSWORD,
});

module.exports.typeDef = gql`
  type Subscription {
    roomUpdatedOrDelete: RoomSubscription
  }

  extend type Query {
    rooms: [Room]
    room(id: Int!): Room
  }

  type Room {
    id: Int!
    description: String!
    number: Int!
    state: Int!
    available: Boolean!
  }

  type RoomSubscription {
    operation: String!
    record: Room!
  }
`;

module.exports.resolvers = {
  Subscription: {
    roomUpdatedOrDelete: {
      subscribe: () => pubsub.asyncIterator("row_changed"),
      resolve: (data) => data || {}
    },
  },
  Query: {
    rooms: (_, __, { dataSources }) => {
      return dataSources.roomAPI.findAll();
    },
    room: (_, { id }, { dataSources }) => {
      return dataSources.roomAPI.findById(id);
    },
  },
  // Room: {
  //   room: () => {},
  // },
};
