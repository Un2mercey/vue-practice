export default {
    props: {
        isShown: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hide() {
            this.$emit("update:isShown", false);
        }
    }
}
