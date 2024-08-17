<template>
    <div class="col">
        <h2 class="title">{{ title }}</h2>
        <div v-for="(card, index) in cards" class="card" :key="index">
            <BoardCard :description="card.description" :author="card.author" :lstEdition="card.lstEdition"
                :creation="card.creation"></BoardCard>
        </div>
        <BoardCreatCard></BoardCreatCard>
    </div>
</template>

<script>
import BoardCard from './BoardCard.vue';
import BoardCreatCard from './BoardCreatCard.vue';

export default {
    name: 'BoardCol',
    props: {
        cards: {
            type: Array,
            required: true
        },
        title: {
            type:String,
            required:true
        }
    },
    components: {
        BoardCard,
        BoardCreatCard
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
    margin: 5px;
    background-color: var(--background);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--texto);
}

.card {
    width: 100%;
    min-width: 19vw;
}
</style>
