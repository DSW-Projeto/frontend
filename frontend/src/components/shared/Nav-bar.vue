<template>
    <nav class="nav secondary">
        <img src="../../assets/logo.png" class="logo" alt="logotipo da aplicação">
        <div class="nav-list">
            <v-btn @click="goToList" :class="{ 'disabled': isCurrentRoute('/list') }" depressed class="secondary primary--text"
                :disabled="isCurrentRoute('/list')">Meus Quadros</v-btn>
            <v-btn depressed class="secondary primary--text">Conta</v-btn>
            <v-btn depressed class="secondary primary--text" @click="toggleTheme">Tema teste</v-btn>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            currentColor: 'one'
        }
    },
    methods: {
        isCurrentRoute(route) {
            return this.$route.path === route
        },
        goToList() {
            if (!this.isCurrentRoute('/list')) {
                this.$router.push('/list');
            }
        },
        toggleTheme() {
            if (this.currentColor === 'one') {
                this.$vuetify.theme.themes.dark.primary = '#FF0000';
                this.$vuetify.theme.themes.dark.secondary = '#00FF00';
                this.$vuetify.theme.themes.dark.tertiary = '#0000FF';
                this.$vuetify.theme.themes.dark.background = '#00FFFF';
                this.currentColor = 'two'
            } else {
                this.$vuetify.theme.themes.dark.primary = '#E0E0E0';
                this.$vuetify.theme.themes.dark.secondary = '#303030';
                this.$vuetify.theme.themes.dark.tertiary = '#444';
                this.$vuetify.theme.themes.dark.background = '#1a1a1a';
                this.currentColor = 'one'
            }
        }
    },
    name: 'Nav-bar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/Styles.css';

.v-btn {
    height: 100% !important;
}

.nav {
    padding-left: 15vw;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 5vw;
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
    font-size: 0.7em;
}


.logo {
    height: 100%;
    margin-right: 5px;
}
</style>