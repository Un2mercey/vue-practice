<template>
    <select
        v-model="modelValue"
        @change="onChangeOption"
    >
        <option disabled value="">
            <slot></slot>
        </option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value">
            {{option.name}}
        </option>
    </select>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        onChangeOption(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style scoped>
select {
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    letter-spacing: 1px;
    transition: 4s;
}
</style>
