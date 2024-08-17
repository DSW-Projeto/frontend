<template>
  <div class="boardScreen">
    <v-btn class="secondary" @click="showColorPicker = true" id="changeColor"><v-icon>palette</v-icon></v-btn>
    <v-dialog v-model="showColorPicker" persistent max-width="100%">
      <div id="dialog">
        <div class="colorPickers">
          <v-card>
            <v-card-title>
              Cor de texto
            </v-card-title>
            <v-card-subtitle>
              <v-color-picker v-model="txtColor"></v-color-picker>
            </v-card-subtitle>
          </v-card>
          <v-card>
            <v-card-title>
              Cor das colunas
            </v-card-title>
            <v-card-subtitle>
              <v-color-picker v-model="colColor"></v-color-picker>
            </v-card-subtitle>
          </v-card>
          <v-card>
            <v-card-title>
              Cor dos cards
            </v-card-title>
            <v-card-subtitle>
              <v-color-picker v-model="cardColor"></v-color-picker>
            </v-card-subtitle>
          </v-card>
          <v-card>
            <v-card-title>
              Cor de fundo
            </v-card-title>
            <v-card-subtitle>
              <v-color-picker v-model="backColor"></v-color-picker>
            </v-card-subtitle>
          </v-card>
          
        </div>
        <v-card-actions class="actions">
          <v-spacer></v-spacer>
          <v-btn @click="applyColor">Aplicar</v-btn>
          <v-btn @click="showColorPicker = false">Cancelar</v-btn>
        </v-card-actions>
      </div>
    </v-dialog>
    <div class="boardScreenRotate">
      <div class="cols" v-for="(list, index) in lists" :key="index">
        <BoardCol :title="list.title" :cards="list.cards" class="cmpCol secondary primary--text"></BoardCol>
      </div>
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
  methods: {
    applyColor() {
      this.$vuetify.theme.themes.dark.primary = this.txtColor;
      this.$vuetify.theme.themes.dark.secondary = this.colColor;
      this.$vuetify.theme.themes.dark.tertiary = this.cardColor;
      this.$vuetify.theme.themes.dark.background = this.backColor;
      this.showColorPicker = false;
    }
  },
  mounted() {
    this.$emit('update:wide', true);
  },
  data() {
    return {
      showColorPicker: false,
      cardColor: '#FF0000',
      txtColor: '#FF0000',
      colColor: '#FF0000',
      backColor: '#FF0000',
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
#dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.colorPickers {
  display: flex;
  flex-direction: row;
}

.cols {
  display: flex;
  flex-direction: row;
  height: 100%;
  transform: rotateX(180deg);
}

.boardScreenRotate {
  display: flex;
  flex-direction: row;
  overflow: auto;
  align-items: flex-end;
  transform: rotateX(180deg);
}

#changeColor {
  margin: 2vh 0 2vh 0
}
</style>
