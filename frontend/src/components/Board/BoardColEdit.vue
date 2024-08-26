<template>
  <div class="colEdit">
    <v-btn depressed @click="showColEditor = true" class="btnEdit secondary">
      <v-icon class="primary--text">edit</v-icon>
      <span>Renomear</span>
    </v-btn>
    <v-dialog v-model="showColEditor" persistent max-width="25vw">
      <v-form @submit.prevent="renameCol" v-model="isValid">
        <v-container class="dialogCard secondary">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field v-model="newColTitle" :rules="[minLength, maxLength]" maxlength="25" :counter="25" label="Novo título da coluna" required>
              </v-text-field>
            </v-col>
            <div class="btnCard">
              <v-btn @click="renameCol" :disabled="!isValid">Aceitar</v-btn>
              <v-btn class="error" @click="showColEditor = false, newColTitle = ''">Cancelar</v-btn>
            </div>
          </v-row>
        </v-container>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'BoardColEdit',
  methods: {
    renameCol() {
      if (this.isValid) {
        this.$emit('rename-col', this.newColTitle);
        this.newColTitle = '';
        this.showColEditor = false;
      }
    }
  },
  data() {
    return {
      showColEditor: false,
      newColTitle: '',
      isValid: false,
    }
  },
  computed: {
        minLength() {
            return v => (v && v.length >= 5) || 'A descrição deve ter pelo menos 5 caracteres';
        },
        maxLength() {
            return v => (v && v.length <= 25) || 'A descrição deve ter no máximo 25 caracteres';
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnEdit {
  width: 100%;
}

.btnCard {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 7px;
}
</style>
