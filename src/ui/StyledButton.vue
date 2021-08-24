<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'StyledButton'
}
</script>

<style scoped>
.btn {
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    letter-spacing: 1px;
    transition: 4s;
}
.btn:hover {
    background: linear-gradient(to bottom, white 75%, rgba(0, 128, 128, 0.32));
}
</style>
