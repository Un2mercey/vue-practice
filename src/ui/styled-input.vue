<template>
    <input class="input"
           :type=type
           :placeholder="placeholder"
           :value="modelValue"
           @input="updateInput"
    >
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true,
            validator: function (value) {
                return new RegExp(/checkbox|file|hidden|image|password|radio|reset|submit|text/gm)
                    .test(value);
            }
        },
        placeholder: {
            type: String,
            required: false
        },
        modelValue: {
            type: [String, Number, File, Boolean]
        }
    },
    methods: {
        updateInput(ev) {
            this.$emit('update:modelValue', ev.target.value);
        }
    }
}
</script>

<style scoped>
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-bottom: 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
}
</style>
