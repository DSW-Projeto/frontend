<template>
  <div class="boardScreen">
    <div class="cols" v-for="(list, index) in lists" :key="index">
      <BoardCol :title="list.title" :cards="list.cards" class="cmpCol"></BoardCol>
    </div>
  </div>
</template>

<script>
import BoardCol from './BoardCol.vue';

export default {
  name: 'BoardSc',
  components: {
    BoardCol
  },
  mounted() {
    this.$emit('update:wide', true);
  },
  data() {
    return {
      lists: [
        {
          title: 'esse é o teste 1', cards: [
            { description: 'Primeira descrição genérica', author: 'Thiago', lstEdition: '05/10/2023', creation: '08/06/2023' },
            { description: 'Segunda descrição genérica', author: 'Walker', lstEdition: '10/08/2024', creation: '09/10/2023' },
            { description: 'Terceira descrição genérica', author: 'Walker', lstEdition: '10/08/2024', creation: '09/10/2023' },
          ]
        },
        {
          title: 'Isso é algo', cards: [
            { description: 'Terceira descrição genérica', author: 'Walker', lstEdition: '10/08/2024', creation: '09/10/2023' }
          ]
        },
        {
          title: 'apenas testando', cards: [
            { description: 'Quarta descrição genérica', author: 'Walker', lstEdition: '10/08/2024', creation: '09/10/2023' }
          ]
        },
        {
          title: 'esse é um teste', cards: [
            { description: 'Primeira descrição genérica', author: 'Thiago', lstEdition: '05/10/2023', creation: '08/06/2023' },
            { description: 'Primeira descrição genérica', author: 'Thiago', lstEdition: '05/10/2023', creation: '08/06/2023' },
            { description: 'Primeira descrição genérica', author: 'Thiago', lstEdition: '05/10/2023', creation: '08/06/2023' },
            { description: 'Primeira descrição genérica', author: 'Thiago', lstEdition: '05/10/2023', creation: '08/06/2023' },
            { description: 'Primeira descrição genérica', author: 'Thiago', lstEdition: '05/10/2023', creation: '08/06/2023' },
            { description: 'Primeira descrição genérica', author: 'Thiago', lstEdition: '05/10/2023', creation: '08/06/2023' },
            { description: 'Segunda descrição genérica', author: 'Walker', lstEdition: '10/08/2024', creation: '09/10/2023' },
            { description: 'Terceira descrição genérica', author: 'Walker', lstEdition: '10/08/2024', creation: '09/10/2023' },
          ]
        },
        {
          title: 'mais testes', cards: [
            { description: 'Primeira descrição genérica', author: 'Thiago', lstEdition: '05/10/2023', creation: '08/06/2023' },
            { description: 'Segunda descrição genérica', author: 'Walker', lstEdition: '10/08/2024', creation: '09/10/2023' },
            { description: 'Terceira descrição genérica', author: 'Walker', lstEdition: '10/08/2024', creation: '09/10/2023' },
          ]
        },
      ]
    }
  }
}
</script>


<style scoped>
.cols {
  display: flex;
  flex-direction: row;
  height: 100%;
  transform: rotateX(180deg);
}

.boardScreen {
  display: flex;
  flex-direction: row;
  overflow: auto;
  align-items: flex-end;
  transform: rotateX(180deg);

}
</style>
