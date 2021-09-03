<template>
  <div class="d-flex flex-column align-center ma-12" v-if="players.length > 0">
    <h1>{{ day }}日目の朝</h1>
    <div v-if="victims.length === 0">
      昨夜は誰も犠牲になりませんでした。
    </div>
    <div v-else class="my-6 d-flex flex-column align-center">
      以下の人物が無残な死体で発見されました。
      <ul>
        <li v-for="victim in victims" :key="victim.id">{{ victim.name }}</li>
      </ul>
    </div>
    <div class="my-12 d-flex flex-column align-center" v-if="status === 0">
      <h1><span class="green--text">村陣営</span>の勝利です。</h1>
      <v-btn class="indigo my-6" dark @click="home()">トップへ</v-btn>
    </div>
    <div class="my-12 d-flex flex-column align-center" v-if="status === 1">
      <v-btn class="indigo" dark @click="noon()">会議開始</v-btn>
    </div>
    <div class="my-12 d-flex flex-column align-center" v-if="status === 2">
      <h1><span class="red--text">人狼陣営</span>の勝利です。</h1>
      <v-btn class="indigo my-6" dark @click="home()">トップへ</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppSyncClient from "@/api/AppSyncClient";
import LocalDataService from "@/LocalDataService";
import router from "@/router";
import { Game, Player } from "@/store/model";

interface DawnData {
  game: Game | null;
  day: number;
  players: Player[];
}

export default Vue.extend({
  name: "Dawn",
  components: {},
  data(): DawnData {
    return {
      day: 0,
      game: null,
      players: [],
    };
  },
  computed: {
    victims(): Player[] {
      return this.players.filter(
        (player) => player.diedAt === this.game?.clock
      );
    },
    survivors(): Player[] {
      return this.players.filter((item) => item.diedAt === -1);
    },
    status(): number {
      if (this.survivors.length === 0) {
        return -1;
      }
      const aliveWolves = this.survivors.filter((item) => item.role === "wolf");
      if (aliveWolves.length === 0) {
        return 0;
      } else if (aliveWolves.length * 2 < this.survivors.length) {
        return 1;
      } else {
        return 2;
      }
    },
  },
  methods: {
    async noon() {
      if (this.game) {
        this.game.clock += 1;
        await AppSyncClient.updateGame(this.game);
      }
      router.push({ name: "Noon" });
    },
    async home() {
      for (const player of this.players) {
        if (player.id) {
          await AppSyncClient.deletePlayer(player.id);
        }
      }
      if (this.game) {
        await AppSyncClient.deleteGame(this.game.id);
      }
      router.push({ name: "Home" });
    },
  },
  async mounted() {
    const gameId = LocalDataService.getGameId();
    if (gameId) {
      this.game = await AppSyncClient.getGame(gameId);
      if (this.game) {
        this.day = 1 + Math.floor(this.game.clock / 4);
        this.players = await AppSyncClient.listPlayers(gameId);
        this.players.sort((a, b) => {
          if (a.createdAt && b.createdAt && a.createdAt < b.createdAt) {
            return -1;
          } else {
            return 1;
          }
        });
      }
    }
  },
});
</script>

<style scoped></style>
