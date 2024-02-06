

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
    
      <headerComponent></headerComponent>
      
    </div>
  </header>

  <RouterView />
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import headerComponent from "./components/TheWelcome.vue";

export default{
  components:{
    headerComponent
  }
}
</script>
<style scoped>

</style>
