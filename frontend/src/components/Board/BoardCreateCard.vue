<template>
    <div class="createCard">
        <v-btn depressed @click="showCardCreator = true" class="createCard secondary">
                <v-icon class="primary--text">add</v-icon>
                <span>Novo Card</span>
        </v-btn>
        <v-dialog v-model="showCardCreator" persistent max-width="25vw">
            <v-form @submit.prevent="createNewCard" v-model="isValid">
                <v-container class="dialogCard secondary">
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="newCardDescription" :rules="[minLength, maxLength]" maxlength="30"
                                :counter="30" label="Descrição Do Card" required>
                            </v-text-field>
                        </v-col>
                        <div class="btnCard">
                            <v-btn :disabled="!isValid" @click="createNewCard">Aceitar</v-btn>
                            <v-btn class="error" @click="showCardCreator = false">Cancelar</v-btn>
                        </div>
                    </v-row>
                </v-container>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'BoardCreateCard',
    methods: {
        createNewCard() {
            if (this.isValid) {
                this.$emit('form-submitted', this.newCardDescription);
                this.showCardCreator = false;
                this.newCardDescription = '';
            }
        }
    },
    data() {
        return {
            showCardCreator: false,
            newCardDescription: '',
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
.createCard {
    width: 100%;
}

.dialogCard {
    height: 100%;
}

.btnCard {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 7px;
}

p{
    margin: 0
}
</style>