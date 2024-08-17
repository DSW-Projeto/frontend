<template>
    <div class="createCard secondary">
        <v-icon class="primary--text">add</v-icon>
    </div>
</template>

<script>
export default {
    name: 'CreateCard'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.createCard {
    width: 100%;
    background-color: #444;
    border-radius: 2px;
    padding: 5px;
}

.createCard:hover {
    filter: brightness(50%);
    cursor: pointer;
}
</style>