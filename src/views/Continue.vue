<template>
  <div class="d-flex flex-column align-center mt-6">
    <h1 class="my-6">つづきから</h1>
    <v-text-field
      v-model="gameId"
      :rules="rules"
      class="mb-12"
      counter="25"
      hint="ゲームを再開する際に使用します"
      label="ゲームIDを入力"
      style="width: 30%;"
    />
    <v-btn :disabled="gameId === ''" @click="apply()">
      決定
    </v-btn>
  </div>
</template>

<script lang="ts">
import AppSyncClient from "@/api/AppSyncClient";
import router from "@/router";
import Vue from "vue";

export default Vue.extend({
  name: "Continue",
  components: {},
  data() {
    return {
      gameId: "",
      rules: [(v: any) => v.length <= 25 || "Max 25 characters"],
    };
  },
  methods: {
    async apply() {
      const game = await AppSyncClient.getGame(this.gameId);
      if (game) {
        if (game.players.length === 0) {
          router.push({ name: "Players" });
        }
        switch (game.clock % 4) {
          case 0:
            router.push({ name: "Dawn" });
            break;
          case 1:
            router.push({ name: "Noon" });
            break;
          case 2:
            router.push({ name: "Dusk" });
            break;
          case 3:
            router.push({ name: "Night" });
            break;
        }
      } else {
        alert("そのようなゲームIDは存在しません。");
      }
    },
  },
  mounted() {
    //
  },
});
</script>

<style scoped></style>
