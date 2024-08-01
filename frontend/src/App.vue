<template>
  <div id="app">
    <NavBar />
    <div class="appcontainer">
      <LoginC v-if="existe"/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/shared/Nav-bar.vue';
import LoginC from './components/LoginC.vue';
export default {
  name: 'App',
  components: {
    NavBar, LoginC
  },
  data(){
    return{
      existe:false,
    }
  }
}


</script>

<style>
@import './assets/Styles.css';
#app {
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
  background-color: var(--background-dark);
}

.appcontainer{
  background-color: var(--background);
  margin: 5vw 15vw 5vw 15vw;
  border-radius: 7px;
}

@media(max-width: 600px){
  .appcontainer{
    background-color: black;
  }
}
</style>
