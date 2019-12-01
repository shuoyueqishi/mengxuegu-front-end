<template>
    <div>
        <app-header/>
        <app-navbar/>
        <app-main/>
    </div>
</template>
<script>
import AppHeader from './AppHeader/index.vue'
import AppNavbar from './AppNavbar/index.vue'
import AppMain from './AppMain/index.vue'
export default {
    components: {
       AppHeader,
       AppNavbar,
       AppMain
    },
};
</script>

<style scoped>
.header{
    position: absolute;
    line-height: 50px;
    padding: 0px;
    background-color: #2b3a4b;
    top: 0px;
    left: 0px;
    right: 0px;
}
.navbar{
    position: absolute;
    width: 230px;
    background-color: #545c64;
    top: 49px;
    left: 0px;
    bottom: 0px;
    overflow-y: auto; 
}
.main{
    position: absolute;
    padding: 10px;
    top: 49px;
    left: 230px;
    right: 0px;
    bottom: 0px;
    overflow-y: auto; 
}
</style>