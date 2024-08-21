<template>
  <v-app>
    <div class="background" id="app">
      <NavBar @logout="handleLogout" :username="username" :userLoggedIn="this.userLoggedIn"></NavBar>
      <div :class="['appcontainer', { wide: isWide }]">
        <LoginC @login="handleLogin" v-if="!userLoggedIn" />
        <v-theme-provider v-if="userLoggedIn" :dark="true">
          <router-view @update:wide="handleWide"></router-view>
        </v-theme-provider>
      </div>
    </div>
  </v-app>
</template>

<script>
import NavBar from './components/shared/Nav-Bar.vue';
import LoginC from './components/LoginC.vue';
export default {
  name: 'App',
  components: {
    NavBar, LoginC
  },
  mounted(){
    this.userLoggedIn = localStorage.getItem('authToken') !== null
    if(this.userLoggedIn){
      if(this.$route.path === '/')
      this.$router.push('/list');
      this.username = localStorage.getItem('username');
    }
  },
  data() {
    return {
      userLoggedIn: false,
      isWide: false,
      username: ''
    }
  },
  methods: {
    handleWide(value) {
      this.isWide = value;
    },
    handleLogin(){
      this.username = localStorage.getItem('username');
      this.userLoggedIn = true;
    },
    handleLogout(){
      this.username = '';
      this.userLoggedIn = false;
    },
  },
  watch: {
    $route(to) {
      if (to.name === 'lists') {
        this.isWide = true;
      } else {
        this.isWide = false;
      }
      if(to.name !== 'lists/:id'){
      this.$vuetify.theme.themes.dark.primary = '#E0E0E0';
      this.$vuetify.theme.themes.dark.secondary = '#303030';
      this.$vuetify.theme.themes.dark.tertiary = '#444';
      this.$vuetify.theme.themes.dark.background = '#1a1a1a';
      }
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

}

.appcontainer {
  margin: 5vw 15vw 5vw 15vw;
  border-radius: 7px;
}

.appcontainer.wide {
  margin: 0 5vw 1vw 5vw;
  background-color: transparent;
}

@media(max-width: 600px) {
  .appcontainer {
    background-color: black;
  }
}
</style>
