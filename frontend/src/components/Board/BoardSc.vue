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
      <div class="cols" v-for="(list, index) in lists" :key="index">
        <BoardCol @rename-col="handleNewColName" @send-card="handleNewCard" :id="list.id" :title="list.title" :cards="list.cards"
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
    applyColor() {
      this.$vuetify.theme.themes.dark.primary = this.txtColor;
      this.$vuetify.theme.themes.dark.secondary = this.colColor;
      this.$vuetify.theme.themes.dark.tertiary = this.cardColor;
      this.$vuetify.theme.themes.dark.background = this.backColor;
      this.showColorPicker = false;
    },
    generateId() {
      return String(this.lists.length+1)
    },
    handleNewCol(name) {
      let newId = this.generateId();
      let newCol = { id: newId, title: name, cards: [] };
      this.lists.unshift(newCol);
    },
    handleNewColName(data){
      this.lists.forEach((list)=>{
        if(list.id === data.id){
          list.title = data.title;
        }
      })
    },
    handleNewCard(data) {
      const formatter = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      let today = formatter.format(Date.now());
      let newCard = {
        description: data.description,
        author: 'Thiago',
        lstEdition: '-',
        creation: today
      };
      this.lists.forEach((list) => {
        if (list.id === data.id) {
          list.cards.push(newCard);
        }
      })
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
