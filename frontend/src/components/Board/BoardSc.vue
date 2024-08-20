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
      <BoardCreateCol @form-submitted="handleNewCol" class="createCol"></BoardCreateCol>
      <div class="cols" v-for="(list, index) in sortedLists" :key="index">
        <BoardCol @edit-card="handleEditCard" @delete-card="handleDeleteCard" @card-to-right="handleCardRight" @card-to-left="handleCardLeft" @move-to-right="handleMoveRight"
          @move-to-left="handleMoveLeft" @delete-col="handleDeleteCol" @rename-col="handleNewColName"
          @send-card="handleNewCard" :id="list.id" :title="list.title" :cards="list.cards"
          class="cmpCol secondary primary--text"></BoardCol>
      </div>
    </div>
  </div>
</template>

<script>
import BoardCol from './BoardCol.vue';
import BoardCreateCol from './BordCreateCol.vue';

export default {
  name: 'BoardSc',
  components: {
    BoardCol,
    BoardCreateCol
  },
  methods: {
    handleEditCard(data){
      console.log(data)
      const list = this.lists.find(col => col.id === data.colId);
      const card = list.cards.find(card => card.index === data.cardIndex);
      const formatter = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const today = formatter.format(Date.now());

      card.description = data.description;
      card.lstEdition = today;
    },
    handleDeleteCard(data){
      const list = this.lists.find(col => col.id === data.colId);
      list.cards = list.cards.filter(card => card.index !== data.cardIndex);
      console.log(data)
      list.cards.forEach((card, index) => {
          card.index = index + 1
        });
    },
    moveCard(data, newListId) {
      const newList = this.lists.find(col => col.id === newListId);
      if (newList) {
        const oldList = this.lists.find(col => col.id === data.colId);
        let card = oldList.cards.find(card => card.index === data.cardIndex);
        const newCardIndex = newList.cards.length + 1;
        newList.cards.push(card);
        oldList.cards = oldList.cards.filter(card => card.index !== data.cardIndex);
        card.index = newCardIndex;
        oldList.cards.forEach((card, index) => {
          card.index = index + 1
        });
      }
    },
    handleCardLeft(data) {
      const newListId = (parseInt(data.colId) - 1).toString();
      this.moveCard(data, newListId)
    },
    handleCardRight(data) {
      const newListId = (parseInt(data.colId) + 1).toString();
      this.moveCard(data, newListId)
    },
    handleMoveLeft(id) {
      let leftId = (parseInt(id) - 1).toString();
      const leftCol = this.lists.find(col => col.id === leftId)
      if (leftCol) {
        const col = this.lists.find(col => col.id === id)
        col.id = (parseInt(id) - 1).toString()
        leftCol.id = id
      }
    },
    handleMoveRight(id) {
      let rightId = (parseInt(id) + 1).toString();
      const rightCol = this.lists.find(col => col.id === rightId)
      if (rightCol) {
        const col = this.lists.find(col => col.id === id)
        if (col) {
          col.id = (parseInt(id) + 1).toString()
          rightCol.id = id
        }
      }
    },
    applyColor() {
      this.$vuetify.theme.themes.dark.primary = this.txtColor;
      this.$vuetify.theme.themes.dark.secondary = this.colColor;
      this.$vuetify.theme.themes.dark.tertiary = this.cardColor;
      this.$vuetify.theme.themes.dark.background = this.backColor;
      this.showColorPicker = false;
    },
    generateColId() {
      return String(this.lists.length + 1)
    },
    handleNewCol(name) {
      let newId = this.generateColId();
      let newCol = { id: newId, title: name, cards: [] };
      this.lists.push(newCol);
    },
    handleNewColName(data) {
      this.lists.forEach((list) => {
        if (list.id === data.id) {
          list.title = data.title;
        }
      })
    },
    handleDeleteCol(id) {
      this.lists = this.lists.filter(list => list.id !== id);
      this.lists.forEach((list, index) => {
        list.id = (index + 1).toString();
      });
    },
    handleNewCard(data) {
      const list = this.lists.find(list => list.id === data.id);
      const formatter = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const today = formatter.format(Date.now());
      const index = list.cards.length + 1;
      const newCard = {
        description: data.description,
        author: 'Thiago',
        lstEdition: '-',
        creation: today,
        index: index,
      };
      list.cards.push(newCard);
    },
    sortedCards(list) {
      if (!list || !list.cards) return [];
      return list.cards.slice().sort((a, b) => {
        return a.index - b.index;
      });
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
          id: '2', title: 'aaaaa', cards: [{
            description: 'teste', author: 'Thiago', lstEdition: '-', creation: '-', index: 1
          }, {
            description: 'teste', author: 'Thiago', lstEdition: '-', creation: '-', index: 2
          }]
        }, { id: '1', title: 'bbbbb', cards: [] }, { id: '3', title: 'cccccc', cards: [] }
      ]
    }
  },
  computed: {
    sortedLists() {
      return this.lists.slice().sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);
      });
    },
  }
}
</script>


<style scoped>
#dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.createCol {
  transform: rotateX(180deg);
  margin: 5px;
}

.colorPickers {
  display: flex;
  flex-direction: row;
}

.cols {
  margin: 5px;
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
