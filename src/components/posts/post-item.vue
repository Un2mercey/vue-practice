<template>
    <div class="post">
        <div>
            <h1 class="title">{{ post.title }}</h1>
            <div>id: {{ post.id }}</div>
            <div>userId: {{ post.userId }}</div>
            <div>body {{ post.body }}</div>
        </div>
        <div class="post__buttons">
            <styledButton
                @click="removePost"
                v-text="'Delete'"
            />
            <styledButton
                @click="openPost"
                v-text="'Open'"
            />
        </div>
    </div>
</template>

<script>
import {validatePost} from "@/utils/post-validator";
import styledButton from "@/ui/styled-button";
export default {
    name: "PostItem",
    components: { styledButton },
    props: {
        post: {
            type: Object,
            required: true,
            default: function () {
                return {
                    title: String,
                    id: Number,
                    userId: Number,
                    body: String
                };
            },
            validator: validatePost
        }
    },
    emits: ["removePost"],
    methods: {
        removePost() {
            this.$emit("removePost", this.post);
        },
        openPost() {
            this.$router.push(`/post/${this.post.id}`);
        }
    }
};
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
}

.title {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 24px;
    margin-bottom: 12px;
    color: teal;
    text-shadow: 0 1px 2px rgba(0, 0, 0, .7);
}

.post__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

button {
    margin: 0 0 4px 0;
    width: 80px;
}

</style>
