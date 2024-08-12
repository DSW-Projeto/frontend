<template>
  <div id="app">
    <NavBar />
    <div class="appcontainer">
      <LoginC v-if="userLoggedIn" />
      <v-theme-provider :dark="true">
        <router-view></router-view>
      </v-theme-provider>
    </div>
  </div>
</template>

<script>
import NavBar from './components/shared/Nav-Bar.vue';
import LoginC from './components/LoginC.vue';
export default {
  name: 'App',
  components: {
    NavBar, LoginC
  },
  data() {
    return {
      userLoggedIn: false,
    }
  }
}


</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: "Montserrat";
}

@import './assets/Styles.css';

#app {
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
  background-color: var(--background-dark);
}

.appcontainer {
  background-color: var(--background);
  margin: 5vw 15vw 5vw 15vw;
  border-radius: 7px;
}

@media(max-width: 600px) {
  .appcontainer {
    background-color: black;
  }
}
</style>
