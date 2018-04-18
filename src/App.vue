<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        created(){
            this.$store.dispatch('getUserinfo');
        }
    }
</script>

<style>
    @import './styles/app.less';
</style>
