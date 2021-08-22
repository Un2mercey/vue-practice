<template>
    <form @submit.prevent>
        <h4>Create post</h4>
        <StyledInput
            :type="'text'"
            :placeholder="'Title'"
            v-model="newPost.title" />
        <StyledInput
            :type="'text'"
            :placeholder="'Description'"
            v-model="newPost.description" />
        <StyledButton
            @click="createPost"
        >
            Create
        </StyledButton>
    </form>
</template>

<script>
export default {
    name: 'PostForm',
    data() {
        return {
            newPost: {
                title: '',
                description: ''
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
            this.newPost.title = '';
            this.newPost.description = '';
            this.$emit('postCreated', createdPost);
        }
    },
    emits: ['postCreated']
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>
