<template>
    <nav class="nav">
        <img src="../../assets/logo.png" class="logo" alt="logotipo da aplicação">
        <div class="nav-list">
            <v-btn depressed><a href="">Meus Quadros</a></v-btn>
            <v-btn depressed><a href="">Compartilhados</a></v-btn>
            <v-btn depressed><a href="">Geral</a></v-btn>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Nav-bar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/Styles.css';

.v-btn{
    background-color: var(--background) !important;
    height: 100% !important;
}
.nav {
    padding: 3px;
    padding-left: 15vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: var(--background);
    height: 8vh;
}

.nav-list {
    height: 100%;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
}

.nav-list li {
    display: flex;
    align-items: center;
    height: 100%;
}

a {
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    height: 100%;
    color: var(--texto);
    text-decoration: none;
    text-transform: uppercase;
    font-size: 1.2em;
}


.logo {
    height: 100%;
}
</style>