<template>
    <div class="col">
        <h2 class="title">{{ title }}</h2>
        <div v-for="(card, index) in cards" class="card" :key="index">
            <BoardCard class="tertiary" :description="card.description" :author="card.author"
                :lstEdition="card.lstEdition" :creation="card.creation"></BoardCard>
        </div>
        <div class="colOptions">
            <BoardCreateCard class="option" @form-submitted="handleNewCard"></BoardCreateCard>
            <BoardColEdit class="option" @rename-col="handleNewColName"></BoardColEdit>
        </div>
    </div>
</template>

<script>
import BoardCard from './BoardCard.vue';
import BoardCreateCard from './BoardCreateCard.vue';
import BoardColEdit from './BoardColEdit.vue';

export default {
    name: 'BoardCol',
    methods: {
        handleNewCard(newCardDescription) {
            this.$emit('send-card', { description: newCardDescription, id: this.id });
        },
        handleNewColName(newColName) {
            this.$emit('rename-col', { title: newColName, id: this.id })
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
        BoardColEdit
    },
    data() {
        return {

        }
    }
}
</script>


<style scoped>
@import '../../assets/Styles.css';

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
    display: flex;
    min-width: 19vw;
    justify-content: space-around;
}

.option {
    flex: 1;
}
</style>
