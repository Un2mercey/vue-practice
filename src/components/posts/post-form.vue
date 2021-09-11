<template>
    <form @submit.prevent>
        <h1>Create post</h1>
        <styledInput
            type="text"
            placeholder="Title"
            v-model="newPost.title" />
        <styledInput
            type="text"
            placeholder="Description"
            v-model="newPost.description" />
        <styledButton
            :isDisabled="!newPost.title || !newPost.description"
            @click="createPost"
        >
            Create
        </styledButton>
    </form>
</template>

<script>
import styledInput from "@/ui/styled-input";
import styledButton from "@/ui/styled-button";
export default {
    name: "PostForm",
    components: {
        styledInput,
        styledButton
    },
    data() {
        return {
            newPost: {
                title: "",
                description: ""
            }
        };
    },
    methods: {
        createPost() {
            const createdPost = {
                id: new Date().getTime(),
                userId: new Date().getTime() + 1,
                title: this.newPost.title,
                body: this.newPost.description
            };
            this.newPost.title = "";
            this.newPost.description = "";
            this.$emit("postCreated", createdPost);
        }
    },
    emits: ["postCreated"]
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
h1 {
    color: teal;
    text-shadow: 0 1px 2px rgba(0, 0, 0, .7);
    margin-bottom: 16px;
}
</style>
