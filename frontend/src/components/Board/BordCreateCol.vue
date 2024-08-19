<template>
    <div class="createCol secondary">
        <v-btn @click="showColCreator = true" class="secondary primary--text"><v-icon>add</v-icon><span>Adicionar
            Lista</span></v-btn>
        <v-dialog class="colDialog" v-model="showColCreator" persistent max-width="25vw">
            <v-form @submit.prevent="createNewCol" v-model="isValid">
                <v-container class="tertiary">
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field @blur="validateField" v-model="newColName" :rules="[minLength, maxLength]"
                                maxlength="30" :counter="30" label="Nome da coluna" required>
                            </v-text-field>
                        </v-col>
                        <div class="btnCol">
                            <v-btn @click="createNewCol" :disabled ="!isValid">Aceitar</v-btn>
                            <v-btn class="error" @click="showColCreator = false, newColName = ''">Cancelar</v-btn>
                        </div>
                    </v-row>
                </v-container>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'BoardCreateCol',
    methods: {
        createNewCol() {
            if(this.isValid){
            this.$emit('form-submitted', this.newColName);
            this.showColCreator = false;
            this.newColName = '';
            }
        },
    },
    data() {
        return {
            showColCreator: false,
            newColName: '',
            isValid: false,
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
.colDialog {
    background-color: red;
}

.btnCol {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 7px;
}
</style>