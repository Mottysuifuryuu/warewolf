<template>
  <div class="home">
    <h1>Warewolf</h1>
    <p>テーブル用人狼ゲームマスターシステム</p>
    <div class="d-flex flex-column">
      <v-btn class="mx-15 my-4" @click="gameStart">ゲームスタート</v-btn>
      <v-btn class="mx-15 my-4" @click="rule">ルール設定</v-btn>
      <v-btn class="mx-15 my-4" @click="players">人数設定</v-btn>
      <v-btn class="mx-15 my-4" @click="sounds">サウンド</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router/index';

export default Vue.extend({
  name: 'Home',
  components: {
  },
  methods: {
    gameStart() {
      router.push({ name: 'StartGame', params: {
        day: '1',
        member: '1'
      }});
    },
    rule() {
      router.push({ name: 'Rule' });
    },
    players() {
      router.push({ name: 'Players' });
    },
    sounds() {
      router.push({ name: 'Sounds' });
    },
  }
});
</script>
