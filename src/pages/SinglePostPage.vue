<template>
    <styledSpinner :isLoading="isFetching" />
    <section>
        <h1 v-text="post.title" />
        <p v-text="post.body" />
    </section>
</template>

<script>
import { getPost } from "@/service/post.service";
import styledSpinner from "@/ui/styled-spinner";

export default {
    components: {
        styledSpinner
    },
    data() {
        return {
            isFetching: false,
            post: {}
        }
    },
    created() {
        this.loadPost();
    },
    methods: {
        async loadPost() {
            this.isFetching = true;
            try {
                const response = await getPost(this.$route.params.id);
                this.post = response.data;
            } catch (e) {
                console.error(e);
            } finally {
                this.isFetching = false;
            }
        }
    }


}
</script>

<style scoped>

h1 {
    text-transform: uppercase;
    font-size: 32px;
    padding: 24px;
}

p {
    font-size: 24px;
    margin: 0 24px;
    padding: 5px;
    border: 1px solid teal;
}

</style>
