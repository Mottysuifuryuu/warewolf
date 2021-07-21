<template>
  <div>
    <h1>プレイ人数設定</h1>
    <div class="d-flex flex-row mx-4" v-for="index in players.length" :key="index">
      <v-text-field class="mr-6" v-model="players[index - 1]"/>
      <v-btn width="60" v-if="players.length >= 4" @click="deletePlayer(index - 1)">削除</v-btn>
      <div v-if="players.length < 4" style="width: 60px" />
    </div>
    <div class="d-flex justify-center">
      <v-btn class="mr-12" @click="addPlayer()">追加</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Players',
  components: {
  },
  data() {
    return {
      players: ['', '', ''],
    }
  },
  methods: {
    deletePlayer(index: number) {
      this.players.splice(index, 1);
    },
    addPlayer() {
      this.players.push('');
    }
  },
  mounted() {
    //
  },
})
</script>

<style scoped>

</style>