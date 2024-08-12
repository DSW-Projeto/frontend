<template>
  <div id="app">
    <NavBar />
    <div :class="['appcontainer', { wide: isWide }]">
      <LoginC v-if="userLoggedIn" />
      <v-theme-provider :dark="true">
        <router-view @update:wide="handleWide"></router-view>
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
      isWide: false,
    }
  },
  methods: {
    handleWide(value) {
      this.isWide = value;
    }
  }
}



</script>

<style lang="scss">
@font-face {
  font-family: 'Montserrat';
  src: url('@/assets/Fonts/Montserrat-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
}

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

.appcontainer.wide {
  margin: 1vw 5vw 1vw 5vw;
}

@media(max-width: 600px) {
  .appcontainer {
    background-color: black;
  }
}
</style>
