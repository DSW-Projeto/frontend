<template>
  <div id="app">
    <NavBar />
    <div class="container">
      <LoginC />
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

.container{
  background-color: var(--background);
  margin: 5vh;
  border-radius: 7px;
}
</style>
