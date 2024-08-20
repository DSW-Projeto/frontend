<template>
    <div class="BoardCard">
        <div class="moveButtons">
            <v-btn @click="moveLeft" class="tertiary" depressed>
                <v-icon>arrow_left</v-icon>
            </v-btn>
            <v-btn @click="moveRight" class="tertiary" depressed>
                <v-icon>arrow_right</v-icon></v-btn>
        </div>
        <div @click="showCardEditor = true">
            <p>{{ description }}</p>
            <div class="time">
                <div>
                    <v-icon class="icons primary--text">more_time</v-icon>
                    <span>{{ creation }}</span>
                </div>
                <div>
                    <v-icon class="primary--text">edit</v-icon>
                    <span>{{ lstEdition }}</span>
                </div>
            </div>
        </div>
        <div class="author">
            <span>Autor: {{ author }}</span>
        </div>
        <v-dialog v-model="showCardEditor" persistent max-width="25vw">
            <v-form @submit.prevent="editCard" v-model="isValid">
                <v-container class="dialogCard secondary">
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="newCardDescription" :rules="[minLength, maxLength]" maxlength="30"
                                :counter="30" label="Nova Descrição Do Card" required>
                            </v-text-field>
                        </v-col>
                        <div class="btnCard">
                            <v-btn :disabled="!isValid" @click="editCard">Aceitar</v-btn>
                            <v-btn class="error" @click="showCardEditor = false">Cancelar</v-btn>
                        </div>
                        <div class="btnDelete">
                            <v-btn class="error" @click="showCardEditor = false; deleteCard()"><v-icon>delete</v-icon><span>Apagar
                                    Cartão</span></v-btn>
                        </div>
                    </v-row>
                </v-container>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'BoardCard',
    methods: {
        deleteCard(){
            this.$emit('delete-card', this.index);
        },
        editCard() {
            this.showCardEditor = false;
            this.$emit('edit-card', {cardIndex: this.index, description: this.newCardDescription})
        },
        moveLeft() {
            this.$emit('card-to-left', this.index);
        },
        moveRight() {
            this.$emit('card-to-right', this.index);
        }
    },
    data() {
        return {
            showCardEditor: false,
            isValid: false,
            newCardDescription: '',
        }
    },
    props: {
        index: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        lstEdition: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        creation: {
            type: String,
            required: true,
        },
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
.moveButtons {
    display: flex;
    justify-content: space-between;
}

.btnDelete {
    display: flex;
    justify-content: center;
    width: 100%;
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

.BoardCard {
    padding: 7px;
    text-align: left;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 2px;
    margin-bottom: 7px;
}

.BoardCard:hover {
    cursor: pointer;
}

.time {
    margin-top: 2vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 7px;

    div {
        display: flex;
        flex-direction: row;
    }
}
</style>