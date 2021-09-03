<template>
  <div class="ma-12">
    <h1>ルール設定</h1>
    <div class="ml-12">
      <v-switch v-model="selfProtection" label="自衛アリ" />
      <v-switch
        v-model="sacrifice"
        label="初日犠牲者アリ(人狼に噛まれる可能性のある役職からランダムに一つが初日犠牲者に割り当てられます)"
      />
      <v-switch v-model="consectiveProtection" label="連続護衛アリ" />
      <v-switch v-model="apoptosis" label="共食いアリ" />
      <v-switch v-model="lastWill" label="遺言アリ" />
      <v-switch v-model="footPrint" label="足音アリ" />
      <v-switch v-model="secretBallot" label="秘密投票化" />
      <v-switch
        v-model="randomCast"
        label="初日ランダム占い(初日夜の占い先は、呪殺が発生せずかつ村人判定が出る人からランダムに選ばれます。)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Rule",
  components: {},
  data() {
    return {
      selfProtection: true,
      sacrifice: false,
      consectiveProtection: true,
      apoptosis: false,
      lastWill: false,
      footPrint: false,
      secretBallot: false,
      randomCast: false,
    };
  },
  methods: {},
  mounted() {
    //
  },
});
</script>

<style scoped></style>
