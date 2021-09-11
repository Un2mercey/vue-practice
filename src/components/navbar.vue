<template>
    <div class="navbar">
        <div class="navbar__buttons">
            <styledButton
                @click="changeState('')"
                v-text="'Main'"/>
            <styledButton
                @click="changeState('posts')"
                v-text="'Posts'"/>
        </div>
    </div>
</template>

<script>
import styledButton from "@/ui/styled-button";
export default {
    components: {
        styledButton
    },
    methods: {
        changeState(url) {
            this.$router.push(`/${url}`);
        }
    }
}
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: rgba(0, 128, 128, 0.66);
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    display: flex;
    align-content: center;
    align-items: center;
    padding: 0 5px;
}

button:not(:last-child) {
    margin-right: 5px;
}

</style>
