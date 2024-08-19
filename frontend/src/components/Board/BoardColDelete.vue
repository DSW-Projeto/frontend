<template>
  <div class="colDelete">
    <v-btn depressed class="btnDelete error" @click="showColRemover = true">
      <v-icon>delete</v-icon>
      <span>Remover Coluna</span>
    </v-btn>
    <v-dialog v-model="showColRemover" persistent max-width="25vw">
      <v-container class="dialogCard secondary">
        <div class="delConfirmation">
          <h1>Deletar coluna:</h1>
          <div class="options">
            <v-btn @click="deleteCol"><span>Confirmar</span></v-btn>
            <v-btn class="error" @click="showColRemover = false"><span>Cancelar</span></v-btn>
          </div>
        </div>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'BoardColDelete',
  data() {
    return {
      showColRemover: false,
    }
  },
  methods: {
    deleteCol(){
      this.$emit('delete-col')
      this.showColRemover = false;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnDelete {
  width: 100%;
}
.delConfirmation{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.options{
  display: flex;
  margin-top: 15px;
  justify-content: space-around;
  width: 100%;
}
</style>