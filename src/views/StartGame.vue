<template>
  <div class="d-flex flex-column align-center mt-6">
    <h1 class="my-6">ゲーム開始</h1>
    <v-text-field
      v-model="gameId"
      :rules="rules"
      class="mb-12"
      counter="25"
      hint="ゲームを再開する際に使用します"
      label="ゲームIDを入力"
      style="width: 30%;"
    >
    </v-text-field>
    <v-btn :disabled="gameId === ''" @click="apply()">
      決定
    </v-btn>
  </div>
</template>

<script lang="ts">
import AppSyncClient from "@/api/AppSyncClient";
import LocalDataService from "@/LocalDataService";
import router from "@/router";
import Vue from "vue";

export default Vue.extend({
  name: "StartGame",
  data() {
    return {
      gameId: "",
      rules: [(v: any) => v.length <= 25 || "Max 25 characters"],
    };
  },
  methods: {
    apply() {
      LocalDataService.setGameId(this.gameId);
      AppSyncClient.createGame({
        id: this.gameId,
        clock: -1,
        players: [],
      })
        .then(() => {
          router.push({ name: "Players" });
        })
        .catch(() => {
          alert("このゲームIDはすでに使われています。");
        });
    },
  },
});
</script>

<style scoped></style>
