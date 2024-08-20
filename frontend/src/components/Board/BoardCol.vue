<template>
    <div class="col">
        <div class="colHeader">
            <v-btn @click="moveLeft" depressed class="secondary"><v-icon>arrow_left</v-icon></v-btn>
            <h2 class="title">{{ title }}</h2>
            <v-btn @click="moveRight" depressed class="secondary"><v-icon>arrow_right</v-icon></v-btn>
        </div>
        <div v-for="(card, index) in cards" class="card" :key="index">
            <BoardCard @edit-card="handleEditCard" @delete-card="handleDeleteCard" @card-to-right="handleCardRight" @card-to-left="handleCardLeft" class="tertiary" :index="card.index"
                :description="card.description" :author="card.author" :lstEdition="card.lstEdition"
                :creation="card.creation"></BoardCard>
        </div>
        <div class="colOptions">
            <div class="rowOptions">
                <BoardCreateCard @form-submitted="handleNewCard"></BoardCreateCard>
                <BoardColEdit @rename-col="handleNewColName"></BoardColEdit>
            </div>
            <BoardColDelete @delete-col="handleDeleteCol" class="delBtn"></BoardColDelete>
        </div>
    </div>
</template>

<script>
import BoardCard from './BoardCard.vue';
import BoardCreateCard from './BoardCreateCard.vue';
import BoardColEdit from './BoardColEdit.vue';
import BoardColDelete from './BoardColDelete.vue';

export default {
    name: 'BoardCol',
    methods: {
        handleEditCard(data){
            this.$emit('edit-card', {colId: this.id, description: data.description, cardIndex: data.cardIndex});
        },
        handleDeleteCard(cardIndex){
            this.$emit('delete-card',{colId:this.id, cardIndex: cardIndex});
        },
        handleNewCard(newCardDescription) {
            this.$emit('send-card', { description: newCardDescription, id: this.id });
        },
        handleNewColName(newColName) {
            this.$emit('rename-col', { title: newColName, id: this.id });
        },
        handleDeleteCol() {
            this.$emit('delete-col', this.id);
        },
        handleCardLeft(cardIndex) {
            this.$emit('card-to-left', { colId: this.id, cardIndex: cardIndex });
        },
        handleCardRight(cardIndex) {
            this.$emit('card-to-right', {colId: this.id, cardIndex: cardIndex});
        },
        moveLeft() {
            this.$emit('move-to-left', this.id);
        },
        moveRight() {
            this.$emit('move-to-right', this.id);
        }
    },

    props: {
        cards: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    components: {
        BoardCard,
        BoardCreateCard,
        BoardColEdit,
        BoardColDelete
    },
    data() {
        return {

        }
    }
}
</script>


<style scoped>
@import '../../assets/Styles.css';

.colHeader {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.title {
    margin-bottom: 2vh;
}

.col {
    background-color: var(--background);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--texto);
    overflow-y: auto;
    max-height: 80vh;
}

.card {
    width: 100%;
    min-width: 19vw;
}

.colOptions {
    min-width: 19vw;
}

.rowOptions {
    display: flex;
    margin-bottom: 7px;
}

.delBtn {
    width: 100%;
}
</style>
