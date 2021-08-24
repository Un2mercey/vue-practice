<template>
    <StyledSpinner :isLoading="isFetching" />
    <StyledDialog v-model:isOpened="isDialogVisible">
        <PostForm @postCreated="onPostCreated" />
    </StyledDialog>
    <div style="padding: 20px">
        <div class="tittle">
            <h1>Articles</h1>
            <StyledButton @click="onAddPost">
                Add post
            </StyledButton>
        </div>
        <PostList :posts="posts"
                  :isPostsLoading="isFetching"
                  @removePost="onRemovePost"
                  @fetchPosts="loadPosts"
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
            isFetching: false,
            isDialogVisible: false
        };
    },
    methods: {
        onPostCreated(newPost) {
            this.isFetching = true;
            setTimeout(() => {
                if (validatePost(newPost)) {
                    this.posts.push(newPost);
                }
                this.isFetching = false;
                this.isDialogVisible = false;
            }, 1500);
        },
        onRemovePost(post) {
            this.posts.splice(this.posts.indexOf(post), 1);
        },
        onAddPost() {
            this.isDialogVisible = true;
        },
        async loadPosts(limit = 10) {
            this.isFetching = true;
            try {
                setTimeout(async () => {
                    const response = await fetchPosts(limit);
                    this.posts = response.data;
                    this.isFetching = false;
                }, 1500);
            } catch (e) {
                console.error(e);
                this.isFetching = false;
            }
        }
    },
    mounted() {
        this.loadPosts(5);
    }
}
</script>

<style scoped>
h1 {
    color: teal;
    text-shadow: 0 1px 2px rgba(0, 0, 0, .7);
}
.tittle {
    display: flex;
    justify-content: space-between;
}
</style>
