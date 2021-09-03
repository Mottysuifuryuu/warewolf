<template>
  <div class="mt-6 d-flex flex-column align-center">
    <h1>会議中</h1>
    <span>{{ day }}日目の昼</span>
    <span class="time">
      {{ formatTime }}
    </span>
    <v-btn @click="start" v-if="!timerOn">Start</v-btn>
    <v-btn @click="stop" v-else>Stop</v-btn>
    <v-btn class="mt-12 indigo" dark @click="dusk()">投票へ</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppSyncClient from "@/api/AppSyncClient";
import LocalDataService from "@/LocalDataService";
import router from "@/router";
import { Game, Player } from "@/store/model";

interface NoonData {
  game: Game | null;
  day: number;
  players: Player[];
  min: number;
  sec: number;
  timerOn: boolean;
  timerObj: any;
}

export default Vue.extend({
  name: "Noon",
  components: {},
  data(): NoonData {
    return {
      day: 0,
      game: null,
      players: [],
      min: 5,
      sec: 0,
      timerOn: false,
      timerObj: null,
    };
  },
  methods: {
    async dusk() {
      if (this.game) {
        this.game.clock += 1;
        await AppSyncClient.updateGame(this.game);
      }
      router.push({ name: "Dusk" });
    },
    count() {
      if (this.sec <= 0 && this.min >= 1) {
        this.min--;
        this.sec = 59;
      } else if (this.sec <= 0 && this.min <= 0) {
        this.complete();
      } else {
        this.sec--;
      }
    },
    start() {
      this.timerObj = setInterval(() => {
        this.count();
      }, 1000);
      this.timerOn = true; //timerがONであることを状態として保持
    },
    stop() {
      clearInterval(this.timerObj);
      this.timerOn = false; //timerがOFFであることを状態として保持
    },
    complete() {
      clearInterval(this.timerObj);
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
  computed: {
    formatTime(): string {
      let timeStrings = [this.min.toString(), this.sec.toString()].map(
        (str) => {
          if (str.length < 2) {
            return "0" + str;
          } else {
            return str;
          }
        }
      );
      return timeStrings[0] + ":" + timeStrings[1];
    },
  },
});
</script>

<style scoped>
.time {
  font-size: 100px;
}
</style>
