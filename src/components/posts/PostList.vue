<template>
    <div v-if="posts.length">
        <PostItem
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @removePost="$emit('removePost', $event)"
        />
    </div>
    <div class="no-posts" v-else-if="!isPostsLoading">
        <h2>No posts found.</h2>
        <StyledButton @click="$emit('fetchPosts')">
            Fetch posts
        </StyledButton>
    </div>
</template>

<script>
import PostItem from './PostItem';
import { validatePost } from '@/utils/post-validator';

export default {
    components: { PostItem },
    props: {
        posts: {
            type: Array,
            required: true,
            validator: (v) => v.length === v.map(validatePost).filter(Boolean).length
        },
        isPostsLoading: {
            type: Boolean,
            required: true
        }
    },
    emits: ['removePost', 'fetchPosts']
};
</script>

<style scoped>
.no-posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    letter-spacing: 14px;
    text-transform: uppercase;
}
</style>
