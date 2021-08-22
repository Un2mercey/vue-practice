<template>
    <PostsComponent />
</template>

<script >
import PostsComponent from '@/components/posts/PostsComponent';

export default {
    name: 'App',
    components: { PostsComponent },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
