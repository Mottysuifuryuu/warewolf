<template>
  <div class="d-flex flex-column align-center ma-12" v-if="players.length > 0">
    <h1>{{ day }}日目の夕方</h1>
    <h2>投票の時間です。</h2>
    <h2 v-if="revote === 1">投票は引き分けでした。再投票です。</h2>
    <div
      class="ma-10 d-flex flex-column align-center"
      v-if="survivors.length > current"
    >
      <p>
        <b>{{ survivors[current].name }}</b
        >さんの投票です。
      </p>
      <v-select
        v-model="target"
        :items="survivors"
        item-text="name"
        label="投票先"
        class="port"
        return-object
      >
      </v-select>
      <v-btn class="mt-6" v-if="target !== null" @click="vote()"
        >投票する</v-btn
      >
    </div>
    <v-btn
      class="my-10 indigo"
      dark
      @click="execute()"
      v-if="survivors.length <= current && revote !== 2"
      >開票する</v-btn
    >
    <div v-if="revote === 2" class="my-6 d-flex flex-column align-center">
      <span
        >処刑されたのは<b>{{ executedPlayer.name }}</b
        >さんです。</span
      >
      <div class="my-12 d-flex flex-column align-center" v-if="status === 0">
        <h1><span class="green--text">村陣営</span>の勝利です。</h1>
        <v-btn class="indigo my-6" dark @click="home()">トップへ</v-btn>
      </div>
      <div class="my-12 d-flex flex-column align-center" v-if="status === 1">
        <v-btn class="indigo" dark @click="night()">夜へ</v-btn>
      </div>
      <div class="my-12 d-flex flex-column align-center" v-if="status === 2">
        <h1><span class="red--text">人狼陣営</span>の勝利です。</h1>
        <v-btn class="indigo my-6" dark @click="home()">トップへ</v-btn>
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

interface DuskData {
  game: Game | null;
  day: number;
  players: Player[];
  current: number;
  target: Player | null;
  votedTargets: Player[];
  executedPlayer: Player | null;
  revote: number;
}

export default Vue.extend({
  name: "Dusk",
  components: {},
  data(): DuskData {
    return {
      day: 0,
      game: null,
      players: [],
      current: 0,
      target: null,
      votedTargets: [],
      executedPlayer: null,
      revote: 0,
    };
  },
  computed: {
    survivors(): Player[] {
      return this.players.filter((item) => item.diedAt === -1);
    },
    status(): number {
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
    async night() {
      if (this.game) {
        this.game.clock += 1;
        await AppSyncClient.updateGame(this.game);
      }
      router.push({ name: "Night" });
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
    vote() {
      if (this.target) {
        this.votedTargets.push(this.target);
        this.current += 1;
        this.target = null;
      }
    },
    async execute() {
      const count: { [key: string]: number } = {};
      for (const votedTarget of this.votedTargets) {
        if (votedTarget.id) {
          count[votedTarget.id] = (count[votedTarget.id] ?? 0) + 1;
        }
      }
      const countList = Object.entries(count).map(([key, value]) => ({
        key,
        value,
      }));
      console.log(countList);
      countList.sort((a, b) => {
        if (a.value < b.value) {
          return 1;
        } else {
          return -1;
        }
      });
      if (countList.length > 0) {
        if (countList.length > 1) {
          if (countList[0].value === countList[1].value) {
            this.current = 0;
            this.revote = 1;
          } else {
            const executedPlayers = this.players.filter(
              (item) => item.id === countList[0].key
            );
            if (executedPlayers.length > 0 && this.game) {
              this.executedPlayer = executedPlayers[0];
              this.executedPlayer.diedAt = this.game.clock;
              await AppSyncClient.updatePlayer(this.executedPlayer);
              this.revote = 2;
            }
          }
        } else {
          const executedPlayers = this.players.filter(
            (item) => item.id === countList[0].key
          );
          if (executedPlayers.length > 0 && this.game) {
            this.executedPlayer = executedPlayers[0];
            this.executedPlayer.diedAt = this.game.clock;
            await AppSyncClient.updatePlayer(this.executedPlayer);
            this.revote = 2;
          }
        }
      }
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

<style scoped>
.port {
  width: 300px;
}
</style>
