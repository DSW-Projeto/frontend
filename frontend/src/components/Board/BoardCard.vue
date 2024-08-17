<template>
    <div class="BoardCard">
        <p>{{ description }}</p>
        <div class="time">
            <div>
                <v-icon class="icons primary--text">more_time</v-icon>
                <p>{{ creation }}</p>
            </div>
            <div>
                <v-icon class="primary--text">edit</v-icon>
                <p>{{ lstEdition }}</p>
            </div>
        </div>
        <div class="author">
            <p>Autor: {{ author }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BoardCard',
    props: {
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.BoardCard {
    padding: 7px;
    text-align: left;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 2px;
    margin-bottom: 7px;
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