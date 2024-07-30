<template>
    <nav class="nav">
        <img src="../../assets/logo.png" class="logo" alt="logotipo da aplicação">
        <ul class="nav-list">
            <li><a href="">Meus Quadros</a></li>
            <li><a href="">Compartilhados</a></li>
            <li><a href="">Geral</a></li>
        </ul>
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

.nav{
    padding: 6px;
    padding-left: 5vh;
    display: flex;
    align-items: center;
    background-color:var(--background);
    height: 8vh;
}
.nav-list{
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    list-style: none;
}
.nav-list li{
    display: flex;
    align-items: center;
    height: 100%;
}
a{
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
a:hover{
    opacity: 0.5;
}
.logo{
    height: 100%;
}
</style>