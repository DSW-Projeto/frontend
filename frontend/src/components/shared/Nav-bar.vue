<template>
    <nav class="nav secondary">
        <div class="left-nav">
            <img src="../../assets/logo.png" class="logo" alt="logotipo da aplicação">
            <div class="nav-list">
                <v-btn @click="goToList" :class="{ 'disabled': isCurrentRoute('/list')}" depressed
                    class="secondary primary--text" :disabled="isCurrentRoute('/list') || !userLoggedIn">Meus Quadros</v-btn>
                <v-btn depressed class="secondary primary--text" @click="toggleTheme">Tema teste</v-btn>
            </div>
        </div>
        <div class="rigth-nav">
            <v-btn v-if="userLoggedIn" @click="showAccount = true" class="secondary" depressed>{{ username }}</v-btn>
            <v-dialog v-model="showAccount" persistent max-width="30vw">
                <v-container class="secondary">
                    <v-icon class="close-btn" @click="showAccount = false">close</v-icon>
                    <div class="identity-infos">
                        <h2>{{ username }}</h2>
                        <span>{{ email }}</span>
                    </div>
                    <div class="lst-login">
                        <span style="margin-right: 10px;">Último login:</span><span>{{ lstLogged }}</span>
                    </div>
                    <div class="user-btn">
                        <v-btn depressed class="tertiary"
                            @click="showAccount = false; showChangePass = true"><span>Mudar Senha</span></v-btn>
                        <v-btn depressed class="error"
                            @click="showAccount = false; logout()"><span>Logout</span></v-btn>
                    </div>
                </v-container>
            </v-dialog>
            <v-dialog v-model="showChangePass" persistent max-width="30vw">
                <v-container class="secondary">
                    <v-form @submit.prevent="changePass" v-model="isValid">
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field :type="showPass ? 'text' : 'password'" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPass = !showPass" :error="oldPasswordError" :errorMessages="oldPasswordErrorMessages"
                                    v-model="oldPassword" label="Senha Antiga" required>
                                </v-text-field>
                                <v-text-field :type="showNewPass ? 'text' : 'password'" :append-icon="showNewPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showNewPass = !showNewPass" :error="passwordError" :errorMessages="passwordErrorMessages"
                                    v-model="newPassword" label="Nova Senha" required>
                                </v-text-field>
                            </v-col>
                            <div class="btnCard">
                                <v-btn @click="changePass">Aceitar</v-btn>
                                <v-btn class="error"
                                    @click="showChangePass = false; oldPassword = ''; newPassword = ''">Cancelar</v-btn>
                            </div>
                        </v-row>
                    </v-form>
                </v-container>
            </v-dialog>
        </div>
    </nav>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            showNewPass: false,
            showPass:false,
            passwordError: false,
            passwordErrorMessages: [],
            isValid: false,
            lstLogged: '18/08/2024 - 20:45',
            currentColor: 'one',
            showAccount: false,
            showChangePass: false,
            newPassword: '',
            oldPassword: '',
            oldPasswordError: false,
            oldPasswordErrorMessages: []
        }
    },
    props: {
        userLoggedIn: {
            type: Boolean,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required:true
        }
    },
    methods: {
        async logout() {
            await axios.get('http://localhost:3001/usuario/logout', {
                headers: {
                    'Autorizacao': localStorage.getItem('authToken'),
                    'UsuarioId': localStorage.getItem('userId')
                }
            }).then(
                localStorage.clear(),
                this.$emit('logout'),
                this.$router.push('/login')
            ).catch(error => {
                console.error('Erro:', error);
            });
        },
        passwordValidation() {
            this.passwordErrorMessages = [];
            const rules = this.passwordRules;
            for (let rule of rules) {
                const errorMessage = rule(this.newPassword)
                if (errorMessage !== true) {
                    this.passwordErrorMessages.push(errorMessage);
                }
            }
            this.passwordError = this.passwordErrorMessages.length > 0
            return !this.passwordError;
        },
        oldPasswordValidation() {
            console.log('teste')
            this.oldPasswordErrorMessages = [];
            const rules = this.passwordRules;
            for (let rule of rules) {
                const errorMessage = rule(this.oldPassword)
                if (errorMessage !== true) {
                    this.oldPasswordErrorMessages.push(errorMessage);
                }
            }
            this.oldPasswordError = this.oldPasswordErrorMessages.length > 0
            return !this.oldPasswordError;
        },
        async changePass() {
            const validPass = this.passwordValidation()
            const validOldPass = this.oldPasswordValidation()
            if (validOldPass && validPass) {
                await axios.post('http://localhost:3001/usuario/trocarSenha', {
                    senhaAntiga: this.oldPassword,
                    senhaNova: this.newPassword
                }, {
                    headers: {
                        'Autorizacao': localStorage.getItem('authToken'),
                        'UsuarioId': localStorage.getItem('userId')
                    }
                }).then().catch(error => {
                    console.error('Erro:', error);
                });
                this.showChangePass = false;
                this.newPassword = '';
                this.oldPassword = '';
            }
        },
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
    name: 'Nav-bar',
    computed: {
        passwordRules() {
            return [
                v => !!v || 'O campo de senha é obrigatório.',
                v => v.length >= 8 || 'A senha deve ter pelo menos 8 caracteres.',
                v => v.length <= 15 || 'A senha deve ter no máximo 15 caracteres.',
                v => /^[a-zA-Z_0-9]+$/.test(v) || 'A senha só pode conter letras, números e underscore.',
                v => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(v) || 'A senha precisa ter uma letra maiúscula e um número.'
            ]
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/Styles.css';

.btnCard {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 7px;
    height: 3em;
}

.dialog-background {
    height: 100%;
    padding: 15px;

    .close-btn {
        color: #AA0000;
    }

    .close-btn:hover {
        color: #EE0000;
        cursor: pointer;
    }
}

.user-btn {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 7px;
    height: 3em;

    * {
        height: 100%;
    }
}

.lst-login {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    padding: 15px;
}

.identity-infos {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    padding: 15px;
}

.v-btn {
    height: 100% !important;
}

.left-nav {
    display: flex;
    width: 100%;
}

.nav {
    padding: 0 15vw 0 15vw;
    display: flex;
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