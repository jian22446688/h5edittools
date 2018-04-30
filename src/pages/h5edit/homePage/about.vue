<template>
    <div>
        <v-contextmenu ref="contextmenu">
            <v-contextmenu-item @click="ontest1"><Icon type="compose" color="#e9eaec" size="20" ></Icon> 菜单1</v-contextmenu-item>
            <v-contextmenu-item @click="ontest2"><Icon type="compose" color="#e9eaec" size="20" ></Icon> 菜单1</v-contextmenu-item>
            <v-contextmenu-item><Icon type="compose" color="#e9eaec" size="20" ></Icon> 菜单1</v-contextmenu-item>
            <v-contextmenu-item divider></v-contextmenu-item>
            <v-contextmenu-item><Icon type="compose" color="#e9eaec" size="20" ></Icon> 菜单1</v-contextmenu-item>
            <v-contextmenu-item><Icon type="compose" color="#e9eaec" size="20" ></Icon> 菜单1</v-contextmenu-item>
            <v-contextmenu-item><Icon type="compose" color="#e9eaec" size="20" ></Icon> 菜单1</v-contextmenu-item>
        </v-contextmenu>

        <div v-contextmenu:contextmenu>
            <img src="@/assets/default.png" alt="">
        </div>

    </div>
</template>

<script>
    export default {
        name: "about",


        methods: {

            ontest1(){
                console.log('asdasdfasdf')
            },
            ontest2(){
                console.log('222222222222')
            }

        }
    }
</script>

<style scoped>

</style>
