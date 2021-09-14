<template>
  <div id="app">
    <p class="username">{{ currentUser.username }}'s posts:</p>
    <ul>
      <li class="post" v-for="post in posts" :key="post.id" @click="selectPost(post)">
        <b v-if="post === selectedPost">{{post.content}}</b>
        <i v-else>{{ post.content }}</i>
      </li>
    </ul>
    <num-posts :userId="currentUser.id" />
    <div>
      <input v-model="newPostContent" />
      <button @click="addPost()">Add Post</button>
    </div>
    <div>
      <update-post :post="selectedPost" />
    </div>
  </div>
</template>
<script>
import NumPosts from "./components/NumPosts.vue";
import UpdatePost from "./components/UpdatePost.vue"

import CURRENT_USER from "./graphql/queries/currentUser.gql";
import POSTS_BY_USER from "./graphql/queries/postsByUser.gql";
import ADD_POST from "./graphql/mutations/addPost.gql";

export default {
  name: "app",
  components: {
    NumPosts,
    UpdatePost
  },
  data: function() {
    return {
      currentUser: { id: "a", username: "user" },
      posts: [],
      newPostContent: "",
      query: CURRENT_USER,
      selectedPost: {},
    };
  },
  methods: {
    selectPost(post) {
      this.selectedPost = post;
    },
    addPost() {
      this.$apollo.mutate({
        mutation: ADD_POST,
        variables: { content: this.newPostContent },
        update: (cache, result) => {
          // the new post returned from the server. notice how the field on data
          // matches the name of the mutation in the graphql query.
          let newPost = result.data.addPost;

          // an "identification" needed to locate the right data in the cache.
          // ...seems legit
          let cacheId = {
            query: POSTS_BY_USER,
            variables: { userId: this.currentUser.id },
          };

          // get the old data from the cache, and create a new array containing the
          // new item returned from the server
          const data = cache.readQuery(cacheId);
          const newData = [...data.postsByUser, newPost];

          // write the new array of data for this query into the cache
          cache.writeQuery({
            ...cacheId,
            data: { postsByUser: newData },
          });
        },
        // By specifying optimistic response, we're instructing apollo to update 
        // the cache before receiving a response from the server. This means the 
        // UI will be updated much quicker. 
        optimisticResponse: {
          __typename: "Mutation",
          addPost: {
            __typename: "Post",
            id: "xyz-?",
            content: this.newPostContent,
            userId: this.currentUser.id,
          },
        },
      });

      this.newPostContent = "";
    },
  },
  apollo: {
    currentUser: CURRENT_USER,
    /**
     * Apollo client will automatically match the name of the returned
     * data with the name of the state in the component.
     */
    posts: {
      query: POSTS_BY_USER,
      variables() {
        return { userId: this.currentUser.id };
      },
      /**
       * Since our state is called posts, and the returned data is
       * called postByUser (see the graphql query), they won’t be
       * matched automatically. This update function hooks things
       * up when the names don't match.
       * @param {{postsByUser: {id: string, content: string}[]}} data
       */
      update(data) {
        return data.postsByUser;
      },
    },
  },
};
</script>
<style>
.post:hover {
  cursor: pointer;
  color: lightblue;
}
</style>
