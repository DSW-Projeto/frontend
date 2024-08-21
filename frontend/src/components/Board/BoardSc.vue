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
        <BoardCol @edit-card="handleEditCard" @delete-card="handleDeleteCard" @card-to-right="handleCardRight"
          @card-to-left="handleCardLeft" @move-to-right="handleMoveRight" @move-to-left="handleMoveLeft"
          @delete-col="handleDeleteCol" @rename-col="handleNewColName" @send-card="handleNewCard"
          :index="list.posicao.toString()" :_id="list._id" :title="list.nome" :cards="list.cartoes"
          class="cmpCol secondary primary--text">
        </BoardCol>
      </div>
    </div>
  </div>
</template>

<script>
import BoardCol from './BoardCol.vue';
import BoardCreateCol from './BordCreateCol.vue';
import axios from 'axios';

export default {
  name: 'BoardSc',
  components: {
    BoardCol,
    BoardCreateCol
  },
  methods: {
    async saveState() {
      const boardId = this.$route.params.id;
      this.lists = this.colSorter();
      let listsAux = this.lists;
      listsAux.forEach((coluna) => {
        coluna.cartoes.forEach((card) => {
          const [dia, mes, ano] = card.dataCriacao.split('/');
          card.dataCriacao = new Date(ano, mes - 1, dia);
        })
      });
      await axios.put('http://localhost:3001/quadro/' + boardId, {
        nome: this.nome,
        corPrimaria: this.$vuetify.theme.themes.dark.primary,
        corSecundaria: this.$vuetify.theme.themes.dark.secondary,
        corTerciaria: this.$vuetify.theme.themes.dark.tertiary,
        corFundo: this.$vuetify.theme.themes.dark.background,
        colunas: listsAux,
      }, {
        headers: {
          'Autorizacao': localStorage.getItem('authToken'),
          'UsuarioId': localStorage.getItem('userId')
        }
      }).then().catch(error => {
        console.error('Erro:', error);
      });
      await this.buscarCols();
    },
    async buscarCols() {
      const boardId = this.$route.params.id;
      await axios.get('http://localhost:3001/quadro/detalhe/' + boardId, {
        headers: {
          'Autorizacao': localStorage.getItem('authToken'),
          'UsuarioId': localStorage.getItem('userId')
        }
      }).then(response => {
        this.$vuetify.theme.themes.dark.tertiary = response.data.corTerciaria;
        this.$vuetify.theme.themes.dark.primary = response.data.corPrimaria;
        this.$vuetify.theme.themes.dark.secondary = response.data.corSecundaria;
        this.$vuetify.theme.themes.dark.background = response.data.corFundo;
        this.lists = response.data.colunas;
        this.nome = response.data.nome;

        this.lists.forEach((list) => {
          list.cartoes.forEach((card) => {
            card.dataCriacao = new Date(card.dataCriacao);
            card.dataCriacao = card.dataCriacao.toLocaleDateString('pt-BR');
            card.ultimaModificacao = new Date(card.ultimaModificacao);
            card.ultimaModificacao = card.ultimaModificacao.toLocaleDateString('pt-BR');
          });
        })
      }).catch(error => {
        console.error('Erro:', error);
      });
    },
    async handleEditCard(data) {
      const list = this.lists.find(col => col.posicao === data.colId.toString());
      const card = list.cartoes.find(card => card.posicao === data.cardIndex);
      const formatter = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const today = formatter.format(Date.now());
      card.conteudo = data.description;
      card.ultimaModificacao = today;
      await this.saveState();
    },
    handleDeleteCard(data) {
      const list = this.lists.find(col => col.id === data.colId);
      list.cards = list.cards.filter(card => card.index !== data.cardIndex);
      list.cards.forEach((card, index) => {
        card.index = index + 1
      });
    },
    moveCard(data, newListId) {
      const newList = this.lists.find(col => col.posicao === newListId);
      if (newList) {
        const oldList = this.lists.find(col => col.posicao === data.colId);
        let card = oldList.cartoes.find(card => card.posicao === data.cardIndex);
        const newCardIndex = newList.cartoes.length + 1;
        newList.cartoes.push(card);
        oldList.cartoes = oldList.cartoes.filter(card => card.posicao !== data.cardIndex);
        card.posicao = newCardIndex;
        oldList.cartoes.forEach((card, index) => {
          card.posicao = index + 1
        });
        this.saveState();
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
    async handleMoveLeft(index) {
      let leftIndex = (parseInt(index) - 1).toString();
      const leftCol = this.lists.find(col => col.posicao === leftIndex)
      if (leftCol) {
        const col = this.lists.find(col => col.posicao === index)
        col.posicao = (parseInt(index) - 1).toString()
        leftCol.posicao = index
        await this.saveState();
      }
    },
    async handleMoveRight(index) {
      let rightIndex = (parseInt(index) + 1).toString();
      const rightCol = this.lists.find(col => col.posicao === rightIndex)
      if (rightCol) {
        const col = this.lists.find(col => col.posicao === index)
        col.posicao = (parseInt(index) + 1).toString()
        rightCol.posicao = index
        await this.saveState();
      }
    },
    applyColor() {
      this.$vuetify.theme.themes.dark.primary = this.txtColor;
      this.$vuetify.theme.themes.dark.secondary = this.colColor;
      this.$vuetify.theme.themes.dark.tertiary = this.cardColor;
      this.$vuetify.theme.themes.dark.background = this.backColor;
      this.showColorPicker = false;
      this.saveState();
    },
    generateColId() {
      return String(this.lists.length + 1)
    },
    async handleNewCol(name) {
      const boardId = this.$route.params.id;
      const newId = this.generateColId();
      await axios.post('http://localhost:3001/quadro/' + boardId + '/coluna/', { nome: name, posicao: newId }, {
        headers: {
          'Autorizacao': localStorage.getItem('authToken'),
          'UsuarioId': localStorage.getItem('userId')
        }
      }).then(
      ).catch(error => {
        console.error('Erro:', error);
      });
      await this.buscarCols()
    },
    async handleNewColName(data) {
      this.lists.forEach((list) => {
        if (list.posicao === data.index) {
          list.nome = data.title;
        }
      })
      await this.saveState();
    },
    handleDeleteCol(index) {
      this.lists = this.lists.filter(list => list.posicao !== index);
      this.lists.forEach((list, i) => {
        list.posicao = (i + 1).toString();
      });
      this.saveState();
    },
    async handleNewCard(data) {
      const list = this.lists.find(list => list.posicao === data.index);
      const index = list.cartoes.length + 1;
      const boardId = this.$route.params.id;
      await axios.post('http://localhost:3001/quadro/' + boardId + '/cartao/', {
        conteudo: data.description,
        posicao: index,
        idColuna: data.idColuna
      }, {
        headers: {
          'Autorizacao': localStorage.getItem('authToken'),
          'UsuarioId': localStorage.getItem('userId')
        }
      }).then().catch(error => {
        console.error('Erro:', error);
      });
      this.buscarCols();
    },
    sortedCards(list) {
      if (!list || !list.cards) return [];
      return list.cards.slice().sort((a, b) => {
        return a.index - b.index;
      });
    },
    colSorter() {
      return this.lists.slice().sort((a, b) => {
        return parseInt(a.posicao) - parseInt(b.posicao);
      });
    },
  },
  mounted() {
    this.$emit('update:wide', true);
    this.buscarCols();
  },
  data() {
    return {
      showColorPicker: false,
      cardColor: '#FF0000',
      txtColor: '#FF0000',
      colColor: '#FF0000',
      backColor: '#FF0000',
      nome: '',
      lists: [
        /**{
          id: '2', title: 'aaaaa', cards: [{
            description: 'teste', author: 'Thiago', lstEdition: '-', creation: '-', index: 1
          }, {
            description: 'teste', author: 'Thiago', lstEdition: '-', creation: '-', index: 2
          }]
        }, { id: '1', title: 'bbbbb', cards: [] }, { id: '3', title: 'cccccc', cards: [] }  **/
      ]
    }
  },
  computed: {
    sortedLists() {
      return this.lists.slice().sort((a, b) => {
        return parseInt(a.posicao) - parseInt(b.posicao);
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
