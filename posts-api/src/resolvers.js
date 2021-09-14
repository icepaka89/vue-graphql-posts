import { inMemoryDatabase } from "./inMemoryDatabase.js";

/**
 * Resolvers from the queries defined in schema. We need resolvers for each top
 * level query in the **Query** type.
 *
 * Each resolver has the same four parameters: parent, args, context, and info.
 * You don’t always have to use all four of them.
 *
 * @see /graphql/schema.gql
 */
export const resolvers = {
  Query: {
    /**
     *
     * @param {*} parent
     * @param {{[key: string]: any}} args 
     * @param {{currentUserId: string}} context The apollo server context, you can 
     * add properties to this that you want made available to all the resolvers. 
     * @returns
     */
    currentUser: (parent, args, context) => {
      let user = inMemoryDatabase.users.find((x) => x.id === context.currentUserId);
      return user;
    },
    /**
     *
     * @param {*} parent
     * @param {{[key: string]: any}} args Set of arguments passed along with the
     * query. If the query looks like a function, then each arg will be in the
     * args object here, keyed by their name.
     * @returns
     */
    postsByUser: (parent, args) => {
      let posts = inMemoryDatabase.posts.filter((p) => p.userId === args.userId);
      return posts;
    },
  },
  Mutation: {
    addPost: async (parent, args, context) => {
      let post = {
        id: `xyz-${inMemoryDatabase.posts.length + 1}`,
        content: args.content,
        userId: context.currentUserId,
      };

      inMemoryDatabase.posts.push(post);
      return post;
    },
    updatePost: async (parent, args, context) => {
      console.log(args);
      console.log(inMemoryDatabase);
      const post = inMemoryDatabase.posts.find(p => p.id == args.id);
      post.content = args.content;
      return post;
    }
  },
  User: {
    /**
     * Having the user's posts in a separate resolver is good practice and can 
     * help with performance. If the posts aren't queried for, then they won't 
     * be fetched this way. If you get the posts directly in the currentUser 
     * resolver, they'd be fetched anyway, even if you didn't query for them. 
     * Not to mention it's also way cleaner this way :) 
     * 
     * @param {*} parent Refers to the result from the previous level in a query's
     * hierarchy. In this case, parent refers to the **User** that was queried for
     * to get posts from (since posts is a field on the User type in schema).
     * @param {{[key: string]: any}} args args
     * @returns
     */
    posts: (parent, args) => {
      let posts = inMemoryDatabase.posts.filter((p) => p.userId === parent.id);
      return posts;
    },
  },
};
