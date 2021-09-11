<template>
    <button class="btn"
            :disabled="isDisabled"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        isDisabled: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style scoped>
.btn {
    align-self: flex-end;
    padding: 10px 15px;
    background: white;
    color: teal;
    border: 1px solid teal;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    letter-spacing: 1px;
    transition: 1s;
}

.btn:hover {
    cursor: pointer;
    background: teal;
    color: white;

}

.btn:disabled {
    background: rgba(220, 20, 60, 0.25);
    cursor: not-allowed;
}
</style>
