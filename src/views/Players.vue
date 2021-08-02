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
    <div class="body1 d-flex justify-end">
      <label style="margin: 24px;">人狼</label>  
      <input type="number" min=1 max=wolfM v-model.number="wolf" name="wolf" style="border:2px #000000 solid; border-radius: 10px;">
    </div>
    <div class="body1 d-flex justify-end">
      <label style="margin: 24px;">狂人</label>
      <input type="number" min=0 v-model.number="lunatic" name="lunatic" style="border:2px #000000 solid; border-radius: 10px;">
    </div>
  <div class="body2 d-flex justify-end">
      <label style="margin: 24px;">占い師</label>
      <input type="number" min=0 v-model.number="caster" name="caster" style="border:2px #000000 solid; border-radius: 10px;">
  </div>
  <div class="body2 d-flex justify-end">
    <label style="margin: 24px;">霊媒師</label>
    <input type="number" min=0 v-model.number="shaman" name="shaman" style="border:2px #000000 solid; border-radius: 10px;">
  </div>
  <div class="body2 d-flex justify-end">
    <label style="margin: 24px;">狩人</label>
    <input type="number" min=0 v-model.number="hunter" name="hunter" style="border:2px #000000 solid; border-radius: 10px;">
  </div>
  <div class="body2 d-flex justify-end">
    <label style="margin: 24px;">村人</label>
    <input type="number" min=0 v-model.number="villager" name="villager" style="border:2px #000000 solid; border-radius: 10px;">
  </div>
  <div class="body2 d-flex justify-end">
    <label style="margin: 24px;">共有者</label>
    <input type="number" min=0 v-model.number="syncronyzer" name="syncronyzer" style="border:2px #000000 solid; border-radius: 10px;">
  </div>
  <div class="body2 d-flex justify-end">
    <label style="margin: 24px;">逃亡者</label>
    <input type="number" min=0 v-model.number="somnumbulist" name="somnumbulist" style="border:2px #000000 solid; border-radius: 10px;">
  </div>
  <div class="body2 d-flex justify-end">
    <label style="margin: 24px;">追跡者</label>
    <input type="number" min=0 v-model.number="chaser" name="chaser" style="border:2px #000000 solid; border-radius: 10px;">
  </div>
  <div class="body3 d-flex justify-end">
    <label style="margin: 24px;">妖狐</label>
    <input type="number" min=0 v-model.number="fox" name="fox" style="border:2px #000000 solid; border-radius: 10px;"/>
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
      wolf: 1,
      lunatic: 0,
      caster: 1,
      shaman: 0,
      hunter: 0,
      villager: 0,
      syncronyzer: 0,
      somnumbulist: 0,
      chaser: 0,
      fox: 0,
    }
  },
  methods: {
    deletePlayer(index: number) {
      this.players.splice(index, 1);
    },
    addPlayer() {
      this.players.push('');
    },
  },
  mounted() {
    //
  },
})
</script>

<style scoped>
.body1 {
  margin: 20px;
  padding: 5px;
  background-color: red;
  font-weight: bolder;
}
.body2 {
  margin: 20px;
  padding: 5px;
  background-color: green;
  font-weight: bolder;
}
.body3 {
  margin: 20px;
  padding: 5px;
  background-color: yellow;
  font-weight: bolder;
}
</style>