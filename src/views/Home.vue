<template>
  <div class="home">
    <h1>Warewolf</h1>
    <p>テーブル用人狼ゲームマスターシステム</p>
    <button @click="gameStart">ゲームスタート</button>
    <button @click="rule">ルール設定</button>
    <button @click="member">人数設定</button>
    <button @click="sound">サウンド</button>
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
      router.push({ name: 'Night', params: {
        day: '1',
        member: '1'
      } });
    }
  }
});
</script>
