<template>
    <StyledSpinner :is-loading="isFetched" />
    <div style="padding: 20px">
        <PostForm @postCreated="onPostCreated" />
        <PostList :posts="posts"
                  @removePost="onRemovePost"
                  @fetchPosts="onFetchPosts"
        />
    </div>
</template>

<script>
import PostForm from '@/components/posts/PostForm';
import PostList from '@/components/posts/PostList';
import { fetchPosts } from '@/service/post.service';
import { validatePost } from '@/utils/post-validator';

export default {
    name: 'PostsComponent',
    components: { PostList, PostForm },
    data() {
        return {
            posts: [],
            isFetched: false
        };
    },
    async created() {
        this.isFetched = true
        try {
            this.posts = await fetchPosts(5);
            this.isFetched = false;
        } catch (e) {
            console.error(e);
            this.isFetched = false;
        }
    },
    methods: {
        onPostCreated(newPost) {
            if (validatePost(newPost)) {
                this.posts.push(newPost);
            }
        },
        onRemovePost(post) {
            this.posts.splice(this.posts.indexOf(post), 1);
        },
        async onFetchPosts() {
            this.isFetched = true
            try {
                this.posts = await fetchPosts(15);
                this.isFetched = false;
            } catch (e) {
                console.error(e);
                this.isFetched = false;
            }
        }
    }
}
</script>

<style scoped>

</style>
