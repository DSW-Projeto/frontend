<template>
  <div class="log-container">
    <div class="login-form">
      <h1 class="login-title">REALIZE O LOGIN</h1>
      <div class="form">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field dark autocomplete="null" no-autocomplete placeholder="exemplo@mail.com" label="Email"
                  filled :rules="emailRules" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field dark filled v-model="firstname" :rules="nameRules" placeholder="Senha" label="Senha"
                  required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center"><v-btn>ENTRAR</v-btn></v-col>
            </v-row>
          </v-container>
        </v-form>
        <h1 class="SignUp-title">OU REGISTRE-SE</h1>
        <v-form v-model="valid">
          <v-container>
            <v-row cols="12" sm="6" md="4">
              <v-text-field dark filled v-model="username" :ruled="userRules" placeholder="Usuário" label="Usuário"
                required></v-text-field>
            </v-row>
            <v-row cols="12" sm="6" md="4">
              <v-text-field dark filled v-model="password" :ruled="userRules" placeholder="Senha" label="Senha"
                required></v-text-field>
            </v-row>
            <v-row cols="12" sm="6" md="4">
              <v-text-field dark filled v-model="password" :ruled="userRules" placeholder="Repetir Senha"
                label="Repetir Senha" required></v-text-field>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4" align="center"><v-btn>REGISTRAR</v-btn></v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginC'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/Styles.css';

.log-container {
  padding: 32px;
  color: var(--texto);
  display: flex;
  justify-content: center;
}

h1,
.row {
  margin: 6px;
}

.v-text-field {
  font-size: 1.2em;
  background-color: var(--background);
}

.login-form {
  text-align: center;
}
</style>