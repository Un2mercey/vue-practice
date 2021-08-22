<template>
    <div class="post">
        <div>
            <h1 class="title">{{ $props.post.title }}</h1>
            <div>id: {{ $props.post.id }}</div>
            <div>userId: {{ $props.post.userId }}</div>
            <div>body {{ $props.post.body }}</div>
        </div>
        <div class="post__buttons">
            <StyledButton
                @click="$emit('removePost', $props.post)"
            >
                Delete
            </StyledButton>
        </div>
    </div>
</template>

<script>
import {validatePost} from '@/utils/post-validator';

export default {
    name: 'PostItem',
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
    emits: ['removePost']
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
}

.title {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 24px;
    margin-bottom: 12px;
    color: teal;
    text-shadow: 0 1px 7px rgba(116, 3, 173, 0.59);
}

.post__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
</style>
