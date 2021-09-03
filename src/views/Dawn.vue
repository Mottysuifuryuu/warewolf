<template>
  <div class="ma-12">
    <h1>{{ day }}日目の朝</h1>
    <div class="ma-6">
      昨夜の犠牲者は以下の通りです。
      <ul>
        <li v-for="victim in victims" :key="victim.id">{{ victim.name }}</li>
      </ul>
      <div v-if="victims.length === 0">
        犠牲者は誰も出ませんでした。
      </div>
      <div class="my-12" v-if="status === 0">
        <h1>村陣営の勝利です。</h1>
        <div class="ma-6"><v-btn @click="home()">トップへ</v-btn></div>
      </div>
      <div class="my-12" v-if="status === 1">
        <v-btn @click="noon()">会議開始</v-btn>
      </div>
      <div class="my-12" v-if="status === 2">
        <h1>人狼陣営の勝利です。</h1>
        <div class="ma-6"><v-btn @click="home()">トップへ</v-btn></div>
      </div>
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
    home() {
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
