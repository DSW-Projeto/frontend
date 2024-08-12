<template>
  <div class="boardScreen">
    <p>.</p>
    <div class="cols"  v-for="(item, index) in items" :key="index">
      <BoardCol class="cmpCol"></BoardCol>
      <div v-if="index < items.length - 1" class="divider"></div>
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
      items: [1, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5]
    }
  }
}
</script>


<style scoped>

.cmpCol{
  margin: 0 1vw 0 1vw;
}
.cols{
  display: flex;
  flex-direction: row;
  height: 75vh;
}
.divider {
  width: 1px;
  background-color: #555;
  height: 99%;
  margin: 0 5px;
}

.boardScreen {
  display: flex;
  flex-direction: row;
  overflow: auto;
  
}
</style>
