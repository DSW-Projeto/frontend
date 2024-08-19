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
                    <td @click="goToPage(item.id)">{{ item.screenName }}</td>
                    <td @click="goToPage(item.id)">{{ item.autor }}</td>
                    <td @click="goToPage(item.id)">{{ item.dataMod }}</td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>

//let data1 = new Date(2024, 8, 9);
let data2 = new Date(2022, 8, 9);
//let data3 = new Date(2020, 8, 9);


export default {
    name: 'Frame-List',
    methods: {
        goToPage(id) {
            this.$router.push(`/list/${id}`);
        },
        createNewBoard() {
            if (this.isValid) {
                const formatter = new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
                let today = formatter.format(Date.now());
                let newId = this.boards.length + 1
                let newBoard = {
                    autor: 'Thiago Sousa',
                    dataMod: today,
                    screenName: this.newBoardName,
                    id: newId
                }
                this.boards.unshift(newBoard)
                this.showBoardCreator = false;
                this.newBoardName ='';
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
                    autor: 'Thiago Sousa',
                    dataMod: data2.toLocaleDateString('pt-BR'),
                    screenName: 'Teste',
                    id: 1
                },

            ],
        }
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