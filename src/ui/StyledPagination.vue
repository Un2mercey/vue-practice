<template>
    <div class="pagination">
        <StyledButton
            v-for="page in totalPages"
            :key="page"
            :class="{
                'current-page': page === currentPage
            }"
            @click="$emit('pageChange', page)"
        >
            {{page}}
        </StyledButton>
    </div>
</template>

<script>
export default {
    name: 'StyledPagination',
    props: {
        totalPages: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
    },
    emits: ['pageChange']
}
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    width: 100%;
    background: linear-gradient(to bottom, rgba(244, 244, 244, .4) 30%, white);
}
.current-page {
    background: teal;
    color: white;
}
button {
    font-weight: 600;
}
</style>
