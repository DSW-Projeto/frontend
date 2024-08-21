<template>
    <div class="Frame-List">
        <v-btn @click="showBoardCreator = true" depressed class="addBoard secondary">
            <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="showBoardCreator" persistent max-width="25vw">
            <v-form @submit.prevent="createNewBoard" v-model="isValid">
                <v-container class="dialogCard secondary">
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="newBoardName" :rules="[minLength, maxLength]" maxlength="30"
                                :counter="30" label="Nome Do Quadro" required>
                            </v-text-field>
                        </v-col>
                        <div class="btnCard">
                            <v-btn :disabled="!isValid" @click="createNewBoard">Aceitar</v-btn>
                            <v-btn class="error" @click="showBoardCreator = false">Cancelar</v-btn>
                        </div>
                    </v-row>
                </v-container>
            </v-form>
        </v-dialog>
        <v-data-table class="primary--text secondary" :headers="headers" :items="boards" :disable-pagination=true
            :hide-default-footer="true">
            <template v-slot:item="{ item }">
                <tr>
                    <td @click="goToPage(item._id)">{{ item.nome }}</td>
                    <td @click="goToPage(item._id)">-</td>
                    <td @click="goToPage(item._id)">{{ item.ultimaModificacao }}</td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'Frame-List',
    methods: {
        goToPage(_id) {
            this.$router.push(`/list/${_id}`);
        },
        async buscarQuadros() {
            axios.get('http://localhost:3001/quadro', {
                headers: {
                    'Autorizacao': localStorage.getItem('authToken'),
                    'UsuarioId': localStorage.getItem('userId')
                }
            }).then(response => {
                this.boards = response.data
                this.boards.forEach((board) => {
                    board.ultimaModificacao = new Date(board.ultimaModificacao);
                    board.ultimaModificacao = board.ultimaModificacao.toLocaleDateString('pt-BR');
                })
            }).catch(error => {
                console.error('Erro:', error);
            });
        },
        async createNewBoard() {
            if (this.isValid) {
                await axios.post('http://localhost:3001/quadro', { nome: this.newBoardName }, {
                    headers: {
                        'Autorizacao': localStorage.getItem('authToken'),
                        'UsuarioId': localStorage.getItem('userId')
                    }
                }).then().catch(error => {
                    console.error('Erro:', error);
                });
                await this.buscarQuadros();
                this.newBoardName = '';
                this.showBoardCreator = false;
            }
        }
    },
    data() {
        return {
            newBoardName: '',
            showBoardCreator: false,
            isValid: false,
            headers: [
                {
                    text: 'Nome Do Quadro',
                    value: 'screenName',
                    divider: true,
                },
                {
                    text: 'Autor',
                    value: 'autor',
                    divider: true,
                },
                {
                    text: 'Última modificação',
                    value: 'dataMod',

                },
            ],
            boards: [
                {
                },

            ],
        }
    },
    mounted() {
        axios.get('http://localhost:3001/quadro', {
            headers: {
                'Autorizacao': localStorage.getItem('authToken'),
                'UsuarioId': localStorage.getItem('userId')
            }
        }).then(response => {
            this.boards = response.data
            this.boards.forEach((board) => {
                board.ultimaModificacao = new Date(board.ultimaModificacao);
                board.ultimaModificacao = board.ultimaModificacao.toLocaleDateString('pt-BR');
            })
        }).catch(error => {
            console.error('Erro:', error);
        });
    },
    computed: {
        minLength() {
            return v => (v && v.length >= 5) || 'A descrição deve ter pelo menos 5 caracteres';
        },
        maxLength() {
            return v => (v && v.length <= 25) || 'A descrição deve ter no máximo 25 caracteres';
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/Styles.css';

td:hover {
    cursor: pointer;
}

.addBoard {
    margin-bottom: 7px;
}

.btnCard {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 7px;
}

/* Estilos CSS no arquivo .vue ou global */
</style>