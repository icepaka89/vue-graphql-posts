import apollo from "apollo-server";
// import SCHEMA from "./graphql/schema.gql";
import { resolvers } from "./resolvers.js";
import { currentUserId } from "./constants.js";

const { ApolloServer, gql } = apollo;

/**
 * This is a proof-of-concept graphql api using apollo server. With much
 * inspiration from: https://www.vuemastery.com/blog/part-2-building-a-graphql-server/
 *
 * @author Daniel Gomm <dgomm@endpoint.com>
 */

const schema = gql(`
    type Query {
        currentUser: User,
        postsByUser(userId: String!): [Post]
    }

    type Mutation {
      addPost(content: String): Post
      updatePost(id: ID!, content: String!): Post
    }

    type User {
        id: ID!
        username: String!
        posts: [Post]
    }

    type Post {
        id: ID!
        content: String!
        userID: ID!
    }
`);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  // The apollo server context, you can add properties to this that you want 
  // made available to all the resolvers. 
  context: {
    currentUserId
  }
});

server.listen(4001).then(({ url }) => {
  console.log("API server running at localhost:4001");
});
