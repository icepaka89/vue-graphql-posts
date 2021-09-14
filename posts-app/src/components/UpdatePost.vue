<template>
    <div>
        <p>
            Updating Post: {{post.id}}
        </p>
        <input v-model="newContent" />
        <button @click="updatePost()">Update Post</button>
    </div>
</template>
<script>
import UPDATE_POST from "../graphql/mutations/updatePost.gql";

export default {
    name: 'UpdatePost',
    props: ['post'],
    data() {
        return {
            newContent: '',
        };
    },
    watch: {
        post(n, o) {
            if(n !== o) {
                this.newContent = n.content;
            }
        }
    },
    methods: {
        updatePost() {
            this.$apollo.mutate({
                mutation: UPDATE_POST,
                variables: { id: this.post?.id, content: this.newContent }
            });
        }
    }
}
</script>