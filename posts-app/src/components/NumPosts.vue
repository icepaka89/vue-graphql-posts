<template>
    <p>
        Total number of posts: {{posts.length}}
    </p>
</template>
<script>
import POSTS_BY_USER from "../graphql/queries/postsByUser.gql";

export default {
    name: 'NumPosts',
    props: ['userId'],
    data() {
        return {
            posts: [],
        }
    },
    apollo: {
        /**
         * Apollo client will automatically match the name of the returned
         * data with the name of the state in the component.
         */
        posts: {
            query: POSTS_BY_USER,
            variables() {
                return { userId: this.userId };
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
}
</script>