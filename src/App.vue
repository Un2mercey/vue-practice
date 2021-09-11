<template>
    <div class="app">
        <navbar />
        <router-view />
    </div>
</template>

<script>
import navbar from "@/components/navbar";
export default {
    components: { navbar }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

h1 {
    color: teal;
    text-shadow: 0 1px 2px rgba(0, 0, 0, .7);
}

</style>
