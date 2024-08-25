<template>
  <div class="log-container secondary">
    <div class="login-form">
      <h1 class="login-title">REALIZE O LOGIN</h1>
      <div class="form">
        <v-form>
          <v-container>
            <v-row>
              <!-- Login -->
              <v-col cols="12" sm="6" md="6">
                <v-text-field :error="emailError" :errorMessages="emailErrorMessages" v-model="email" dark
                  autocomplete="null" no-autocomplete placeholder="exemplo@mail.com" label="Email" filled
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field :type="showPass ? 'text' : 'password'" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass" :error="passwordError" :errorMessages="passwordErrorMessages"
                  dark filled v-model="password" placeholder="Senha" label="Senha" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center"><v-btn @click="login" depressed>ENTRAR</v-btn></v-col>
            </v-row>
          </v-container>
        </v-form>
        <h1 class="SignUp-title">OU REGISTRE-SE</h1>

        <!-- Registro -->
        <v-form>
          <v-container>
            <v-text-field :error="usernameError" :error-messages="usernameErrorMessages" dark filled v-model="username"
              placeholder="Usuário" label="Usuário" required></v-text-field>

            <v-text-field filled :error="registerEmailError" :error-messages="registerEmailErrorMessages"
              v-model="registerEmail" placeholder="Email" label="Email" required></v-text-field>

            <v-text-field :type="showRegisterPass ? 'text' : 'password'"
              :append-icon="showRegisterPass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showRegisterPass = !showRegisterPass" :error="registerPasswordError"
              :error-messages="registerPasswordErrorMessages" dark filled v-model="registerPassword" placeholder="Senha"
              label="Senha" required></v-text-field>

            <v-text-field :type="showRepeatPass ? 'text' : 'password'"
              :append-icon="showRepeatPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showRepeatPass = !showRepeatPass"
              :error="repeatPasswordError" :error-messages="repeatPasswordErrorMessages" dark filled
              v-model="repeatPassword" placeholder="Repetir Senha" label="Repetir Senha" required></v-text-field>

            <span>Usada para recuperação de senha:</span>

            <v-text-field :type="showKey ? 'text' : 'password'" :append-icon="showKey ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showKey = !showKey" :error="keyWordError" :error-messages="keyWordErrorMessages" dark
              filled v-model="keyWord" placeholder="Palavra-Chave" label="Palavra-Chave" required></v-text-field>

            <v-col>
              <v-btn depressed @click="registrar">REGISTRAR</v-btn>
            </v-col>

          </v-container>
        </v-form>
        <div class="recovery" @click="showPassRecovery = true">
          <span>recuperar senha</span>
        </div>

        <!-- Recuperar Senha -->
        <v-dialog v-model="showPassRecovery" persistent max-width="25vw">
          <v-form @submit.prevent="recoveryPass">
            <v-container class="dialogCard secondary">
              <div v-if="recoveryError" class="recovery-error">
                <h2 class="error--text">Algo deu errado</h2>
              </div>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field :error="recoveryEmailError" :error-messages="recoveryEmailErrorMessages"
                    v-model="recoveryEmail" label="Email" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field :type="showRecoveryKey ? 'text' : 'password'"
                  :append-icon="showRecoveryKey ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showRecoveryKey = !showRecoveryKey" :error="recoveryKeywordError" :error-messages="recoveryKeywordErrorMessages" v-model="recoveryKeyWord" label="Palavra-Chave" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field :type="showNewPass ? 'text' : 'password'"
                  :append-icon="showNewPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showNewPass = !showNewPass" :error="newPassError" :error-messages="newPassErrorMessages" v-model="newPassword" label="Nova Senha" required>
                  </v-text-field>
                </v-col>
                <div class="btnCard">
                  <v-btn @click="recoveryPass">Aceitar</v-btn>
                  <v-btn class="error"
                    @click="showPassRecovery = false; recoveryError = false; recoveryEmail = ''; recoveryKeyWord = ''; newPassword = ''">Cancelar</v-btn>
                </div>
              </v-row>
            </v-container>
          </v-form>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginC',
  data() {
    return {
      //registro
      showKey: false,
      showPass: false,
      showRepeatPass: false,
      showRegisterPass: false,
      usernameError: false,
      usernameErrorMessages: [],
      repeatPasswordError: false,
      repeatPasswordErrorMessages: [],
      registerPasswordError: false,
      registerPasswordErrorMessages: [],
      keyWordError: false,
      keyWordErrorMessages: [],
      registerEmailError: false,
      registerEmailErrorMessages: [],
      username: '',
      keyWord: '',
      repeatPassword: '',
      registerPassword: '',
      registerEmail: '',

      //login
      passwordError: false,
      passwordErrorMessages: [],
      password: '',
      emailError: false,
      emailErrorMessages: [],
      email: '',

      //recuperar senha
      showNewPass: false,
      showRecoveryKey: false,
      newPassErrorMessages: [],
      newPassError: false,
      recoveryKeywordErrorMessages: [],
      recoveryKeywordError: false,
      recoveryEmailErrorMessages: [],
      recoveryEmailError: false,
      recoveryError: false,
      showPassRecovery: false,
      recoveryKeyWord: '',
      newPassword: '',
      recoveryEmail: ''
    }
  },
  methods: {

    //Login e validações
    async login() {
      console.log(this.validatePassword())
      if (
        this.validateEmail() &&
        this.validatePassword()
      ) {
        let loginForm = {
          email: this.email,
          senha: this.password
        }
        axios.post('http://localhost:3001/usuario/login', loginForm).then(response => {
          console.log(response.data);
          const { token, _id, username } = response.data;
          localStorage.setItem('authToken', token);
          localStorage.setItem('userId', _id);
          localStorage.setItem('username', username);
          localStorage.setItem('email', this.email);
          this.$emit('login');
          this.$router.push('/list');
        }).catch(error => {
          if (error.response.data[0] === 'Usuário ou senha incorretos') {
            alert(error.response.data[0]);
          }
          console.error('Erro:', error);
        });
      }
    },
    validatePassword() {
      const rules = this.passwordRules;
      this.passwordErrorMessages = [];

      for (let rule of rules) {
        const errorMessage = rule(this.password);
        if (errorMessage !== true) {
          this.passwordErrorMessages.push(errorMessage);
        }
      }
      this.passwordError = this.passwordErrorMessages.length > 0;
      return !this.passwordError;
    },
    validateEmail() {
      const rules = this.emailRules;
      this.emailErrorMessages = [];

      for (let rule of rules) {
        const errorMessage = rule(this.email);
        if (errorMessage !== true) {
          this.emailErrorMessages.push(errorMessage);
        }
      }
      this.emailError = this.emailErrorMessages.length > 0;
      return !this.emailError;
    },


    //Registro e validações
    validateKeyWord() {
      const rules = this.keyWordRules;
      this.keyWordErrorMessages = [];

      for (let rule of rules) {
        const errorMessage = rule(this.keyWord);
        if (errorMessage !== true) {
          this.keyWordErrorMessages.push(errorMessage);
        }
      }
      this.keyWordError = this.keyWordErrorMessages.length > 0;
      return !this.keyWordError;
    },
    validateRegisterEmail() {
      const rules = this.emailRules;
      this.registerEmailErrorMessages = [];

      for (let rule of rules) {
        const errorMessage = rule(this.registerEmail);
        if (errorMessage !== true) {
          this.registerEmailErrorMessages.push(errorMessage);
        }
      }
      this.registerEmailError = this.registerEmailErrorMessages.length > 0;
      return !this.registerEmailError;
    },
    validateRegisterPassword() {
      const rules = this.passwordRules;
      this.registerPasswordErrorMessages = [];

      for (let rule of rules) {
        const errorMessage = rule(this.registerPassword);
        if (errorMessage !== true) {
          this.registerPasswordErrorMessages.push(errorMessage);
        }
      }
      this.registerPasswordError = this.registerPasswordErrorMessages.length > 0;
      return !this.registerPasswordError;
    },
    validateRegisterRepeatPassword() {
      const rules = this.repeatPasswordRules;
      this.repeatPasswordErrorMessages = [];

      for (let rule of rules) {
        const errorMessage = rule(this.repeatPassword);
        if (errorMessage !== true) {
          this.repeatPasswordErrorMessages.push(errorMessage);
        }
      }
      this.repeatPasswordError = this.repeatPasswordErrorMessages.length > 0;
      return !this.repeatPasswordError;
    },
    validateUsername() {
      const rules = this.usernameRules;
      this.usernameErrorMessages = [];

      for (let rule of rules) {
        const errorMessage = rule(this.username);
        if (errorMessage !== true) {
          this.usernameErrorMessages.push(errorMessage);
        }
      }
      this.usernameError = this.usernameErrorMessages.length > 0;
      return !this.usernameError;
    },
    async registrar() {
      if (
        this.validateRegisterEmail() &&
        this.validateKeyWord() &&
        this.validateRegisterPassword() &&
        this.validateRegisterRepeatPassword() &&
        this.validateUsername()
      ) {
        let registro = {
          nome: this.username,
          email: this.registerEmail,
          senha: this.registerPassword,
          palavraChave: this.keyWord
        }
        axios.post('http://localhost:3001/usuario/', registro).then(response => {
          const { token, _id } = response.data;
          localStorage.setItem('authToken', token);
          localStorage.setItem('userId', _id);
          localStorage.setItem('username', this.username);
          localStorage.setItem('email', this.registerEmail);
          this.$emit('login');
          this.$router.push('/list');
        }).catch(error => {
          console.error('Erro:', error);
        });
      }
    },

    //Recuperar senha
    validateRecoveryPass() {
      const rules = this.passwordRules;
      this.newPassErrorMessages = [];

      for (let rule of rules) {
        const errorMessage = rule(this.newPassword);
        if (errorMessage !== true) {
          this.newPassErrorMessages.push(errorMessage);
        }
      }
      this.newPassError = this.newPassErrorMessages.length > 0;
      return !this.newPassError;
    },
    validateRecoveryEmail() {
      const rules = this.emailRules;
      this.recoveryEmailErrorMessages = [];

      for (let rule of rules) {
        const errorMessage = rule(this.recoveryEmail);
        if (errorMessage !== true) {
          this.recoveryEmailErrorMessages.push(errorMessage);
        }
      }
      this.recoveryEmailError = this.recoveryEmailErrorMessages.length > 0;
      return !this.recoveryEmailError;
    },
    validateRecoveryKeyWord() {
      const rules = this.keyWordRules;
      this.recoveryKeywordErrorMessages = [];

      for (let rule of rules) {
        const errorMessage = rule(this.recoveryKeyWord);
        if (errorMessage !== true) {
          this.recoveryKeywordErrorMessages.push(errorMessage);
        }
      }
      this.recoveryKeywordError = this.recoveryKeywordErrorMessages.length > 0;
      return !this.recoveryKeywordError;
    },
    recoveryPass() {
      const validatePass = this.validateRecoveryPass();
      const validateEmail = this.validateRecoveryEmail();
      const validateKeyWord = this.validateRecoveryKeyWord();
      const validate = validateEmail && validatePass && validateKeyWord;
      if (validate) {
        axios.post('http://localhost:3001/usuario/recuperarSenha', {
          email: this.recoveryEmail,
          palavraChave: this.recoveryKeyWord,
          novaSenha: this.newPassword
        }).then((response) => {
          this.showPassRecovery = false;
          alert(response.data[0]);
          this.recoveryEmail = '';
          this.newPassword = '';
          this.recoveryKeyWord = '';
          this.recoveryError = false;
        }).catch(error => {
          this.recoveryError = true;
          console.error('Erro:', error);
        });
      }
    }
  },
  computed: {
    emailRules() {
      return [
        v => !!v || 'O campo Email é obrigatório.',
        v => /.+@.+\..+/.test(v) || 'Email inválido.',
      ];
    },
    keyWordRules() {
      return [
        v => !!v || 'O campo Palavra-Chave é obrigatório.',
        v => v.length >= 5 || 'Palavra-Chave deve ter pelo menos 5 caracteres.',
        v => v.length <= 15 || 'Palavra-Chave deve ter no máximo 15 caracteres.',
        v => /^[a-zA-Z]+$/.test(v) || 'Palavra-chave só pode conter letras.',
      ];
    },
    passwordRules() {
      return [
        v => !!v || 'O campo de senha é obrigatório.',
        v => v.length >= 8 || 'A senha deve ter pelo menos 8 caracteres.',
        v => v.length <= 15 || 'A senha deve ter no máximo 15 caracteres.',
        v => /^[a-zA-Z_0-9]+$/.test(v) || 'A senha só pode conter letras, números e underscore.',
        v => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(v) || 'A senha precisa ter uma letra maiúscula e um número.'
      ]
    },
    registerPasswordRules() {
      return [
        v => !!v || 'O campo de senha é obrigatório.',
        v => v.length >= 8 || 'A senha deve ter pelo menos 8 caracteres.',
        v => v.length <= 15 || 'A senha deve ter no máximo 15 caracteres.',
        v => /^[a-zA-Z_0-9]+$/.test(v) || 'A senha só pode conter letras, números e underscore.',
        v => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(v) || 'A senha precisa ter uma letra maiúscula e um número.',
        v => v === this.repeatPassword || 'As senhas não combinam.'
      ]
    },
    repeatPasswordRules() {
      return [
        v => !!v || 'O campo repetir senha é obrigatório.',
        v => v === this.registerPassword || 'As senhas não combinam.'
      ]
    },
    usernameRules() {
      return [
        v => !!v || 'O campo username é obrigatório.',
        v => /^[a-zA-Z_0-9]+$/.test(v) || 'O username só pode conter letras, números e underscore.',
        v => v.length >= 5 || 'O username deve ter ao menos 5 caracteres.'
      ]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/Styles.css';

.recovery-error {
  display: flex;
  justify-content: center;
}

.btnCard {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 7px;
}


.recovery {
  display: flex;
  align-items: start;

  span:hover {
    cursor: pointer;
    color: var(--background-dark);
  }
}

.log-container {
  padding: 32px;
  color: var(--texto);
  display: flex;
  justify-content: center;
  border-radius: 7px;
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