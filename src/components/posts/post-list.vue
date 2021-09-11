<template>
    <div v-if="posts.length">
        <transition-group name="post-list">
            <postItem
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @removePost="onRemovePost"
            />
        </transition-group>
    </div>
    <div class="no-posts" v-else-if="!isPostsLoading && !isFiltering">
        <h2 v-text="'No posts found.'" />
        <styledButton
            @click="onFetchPosts"
            v-text="'Fetch posts'"
        />
    </div>
</template>

<script>
import postItem from "./post-item";
import styledButton from "@/ui/styled-button";
import { validatePost } from "@/utils/post-validator";
export default {
    components: { postItem, styledButton },
    props: {
        posts: {
            type: Array,
            required: true,
            validator: (v) => v.length === v.map(validatePost).filter(Boolean).length
        },
        isPostsLoading: {
            type: Boolean,
            required: true
        },
        isFiltering: {
            type: Boolean,
            required: true
        }
    },
    emits: ["removePost", "fetchPosts"],
    methods: {
        onRemovePost(event) {
            this.$emit("removePost", event);
        },
        onFetchPosts() {
            this.$emit("fetchPosts");
        }
    }
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
    margin: auto;
    padding-top: 48px;
    color: teal;
}
.post-list-item {
    display: inline-block;
    margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
}
.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.post-list-move {
    transition: transform .8s ease;
}

</style>
