<template>
    <section>
        <h1 v-text="'Welcome'" style="text-align: center; font-size: 32px;" />
    </section>
</template>

<script>
export default {

}
</script>

<style scoped>
section {
    padding: 24px;
}

a {
    color: rgba(0, 128, 64, 0.61);
    border: 1px solid rgba(0, 83, 128, 0.53);
    text-shadow: 0 1px 2px rgba(0, 128, 64, .3);
    box-shadow: 0 1px 10px rgba(0, 83, 128, .15);
    border-radius: 20px;
    transition: 1s;
    padding: 10px 15px;
    text-decoration: unset;
}

</style>
