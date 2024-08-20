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
                <v-text-field :error="emailError" :errorMessages="emailErrorMessages" v-model="email" dark autocomplete="null" no-autocomplete
                  placeholder="exemplo@mail.com" label="Email" filled required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field :error="passwordError" :errorMessages="passwordErrorMessages"  dark filled v-model="password" placeholder="Senha" label="Senha" required></v-text-field>
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
            <v-text-field :error="usernameError" :error-messages="usernameErrorMessages" dark filled
              v-model="username" placeholder="Usuário" label="Usuário" required></v-text-field>
            <v-text-field filled  :error="registerEmailError"
              :error-messages="registerEmailErrorMessages" v-model="registerEmail" placeholder="Email" label="Email"
              required></v-text-field>
            <v-text-field :error="registerPasswordError" :error-messages="registerPasswordErrorMessages" dark filled
              v-model="registerPassword" placeholder="Senha" label="Senha" required></v-text-field>
            <v-text-field :error="repeatPasswordError" :error-messages="repeatPasswordErrorMessages" dark filled
              v-model="repeatPassword" placeholder="Repetir Senha" label="Repetir Senha" required></v-text-field>
            <span>Usada para recuperação de senha:</span>
            <v-text-field :error="keyWordError" :error-messages="keyWordErrorMessages" dark filled v-model="keyWord"
              placeholder="Palavra-Chave" label="Palavra-Chave" required></v-text-field>
            <v-col><v-btn depressed @click="registrar">REGISTRAR</v-btn></v-col>
          </v-container>
        </v-form>
        <div class="recovery" @click="showKeyWordInput = true">
          <span>recuperar senha</span>
        </div>

        <!-- Recuperar Senha -->
        <v-dialog v-model="showKeyWordInput" persistent max-width="25vw">
          <v-form @submit.prevent="renameCol">
            <v-container class="dialogCard secondary">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field v-model="recoveryKeyWord" label="Palavra-Chave" required>
                  </v-text-field>
                </v-col>
                <div class="btnCard">
                  <v-btn @click="submitKeyWord">Aceitar</v-btn>
                  <v-btn class="error" @click="showKeyWordInput = false, newColTitle = ''">Cancelar</v-btn>
                </div>
              </v-row>
            </v-container>
          </v-form>
        </v-dialog>
        <v-dialog v-model="showPassRecovery" persistent max-width="25vw">
          <v-form @submit.prevent="renameCol">
            <v-container class="dialogCard secondary">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field v-model="newPassword" label="Nova Senha" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field v-model="repeatNewPassword" label="Confirmar Nova Senha" required>
                  </v-text-field>
                </v-col>
                <div class="btnCard">
                  <v-btn @click="recoveryPassWord">Aceitar</v-btn>
                  <v-btn class="error" @click="showPassRecovery = false, newColTitle = ''">Cancelar</v-btn>
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

export default {
  name: 'LoginC',
  data() {
    return {
      //registro
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
      registerEmail:'',

      //login
      passwordError: false,
      passwordErrorMessages: [],
      password: '',
      emailError:false,
      emailErrorMessages:[],
      email: '',

      //recuperar senha
      showKeyWordInput: false,
      recoveryKeyWord: '',
      showPassRecovery: false,
      newPassword: '',
      repeatNewPassword: '',
    }
  },
  methods: {

    //Login e validações
    login(){
      this.validateEmail()
      this.validadePassword()
    },
    validadePassword(){
      const rules = this.passwordRules;
      this.passwordErrorMessages = [];

      for (let rule of rules) {
        const errorMessage = rule(this.password);
        if (errorMessage !== true) {
          this.passwordErrorMessages.push(errorMessage);
        }
      }
      this.passwordError = this.passwordErrorMessages.length > 0;
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
    },
    registrar() {
      this.validateRegisterEmail()
      this.validateKeyWord()
      this.validateRegisterPassword()
      this.validateRegisterRepeatPassword()
      this.validateUsername()
    },

    //Recuperar senha
    submitKeyWord() {
      if (this.recoveryKeyWord === 'teste') {
        this.showPassRecovery = true;
        this.showKeyWordInput = false;
        this.recoveryKeyWord = '';
      }
    },
    recoveryPassWord() {
      this.newPassword = '';
      this.repeatPassword = '';
      this.showPassRecovery = false;
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
      ]
    },
    registerPasswordRules() {
      return [
        v => !!v || 'O campo de senha é obrigatório.',
        v => v.length >= 8 || 'A senha deve ter pelo menos 8 caracteres.',
        v => v.length <= 15 || 'A senha deve ter no máximo 15 caracteres.',
        v => /^[a-zA-Z_0-9]+$/.test(v) || 'A senha só pode conter letras, números e underscore.',
        v => v === this.repeatPassword || 'As senhas não combinam.'
      ]
    },
    repeatPasswordRules() {
      return [
        v => !!v || 'O campo repetir senha é obrigatório.',
        v => v === this.password || 'As senhas não combinam.'
      ]
    },
    usernameRules() {
      return [
        v => !!v || 'O campo repetir username é obrigatório.',
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