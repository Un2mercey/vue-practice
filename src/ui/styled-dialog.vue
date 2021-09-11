<template>
    <div class="dialog"
         v-if="isOpened"
         @click="hideDialog"
    >
        <div class="dialog__content" @click.stop>
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpened: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    emits: ["hide-dialog"],
    methods: {
        hideDialog() {
            this.$emit("hide-dialog");
        }
    }
}
</script>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, .4);
    position: fixed;
    display: flex;
}
.dialog__content {
    margin: auto;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, .5);
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
}
</style>
