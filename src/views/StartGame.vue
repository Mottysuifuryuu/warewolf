<template>
  <div class="ma-12">
    <h1>ゲーム開始</h1>
    <div class="ml-12">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="gameId"
                :rules="rules"
                counter="25"
                hint="ゲームを再開する際に使用します"
                label="Enter Game ID"
              >
              </v-text-field>
              <div class="d-flex my-6 justify-end">
                <v-btn @click="apply()">
                  決定
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">
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
      router.push({ name: "Players" });
    },
  },
});
</script>

<style scoped></style>
