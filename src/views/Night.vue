<template>
  <div>
    <div class="ma-10" v-if="players.length > current">
      <h1>{{ day }}日目夜</h1>
      <p>{{ players[current].name }}さんの夜行動です</p>
      <Wolf
        v-if="players[current].role === 'wolf'"
        :players="players"
        :victims="victims"
        @victim="setVictim($event)"
      />
      <Villager v-if="players[current].role === 'villager'" />
      <Caster v-if="players[current].role === 'caster'" :players="players" />
      <Shaman v-if="players[current].role === 'shaman'" />
      <Hunter
        v-if="players[current].role === 'hunter'"
        :players="players"
        @huntTarget="hunt($event)"
      />
      <Lunatic v-if="players[current].role === 'lunatic'" />
      <v-btn @click="current += 1">次の人へ渡す</v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import AppSyncClient from "@/api/AppSyncClient";
import Wolf from "@/components/Wolf.vue";
import Villager from "@/components/Villager.vue";
import Caster from "@/components/Caster.vue";
import Shaman from "@/components/Shaman.vue";
import Hunter from "@/components/Hunter.vue";
import Lunatic from "@/components/Lunatic.vue";
import LocalDataService from "@/LocalDataService";
import router from "@/router";
import { Game, Player } from "@/store/model";
import Vue from "vue";

interface NightData {
  game: Game | null;
  day: number;
  players: Player[];
  current: number;
  victims: Player[];
  huntTarget: Player[];
}

export default Vue.extend({
  name: "Night",
  components: { Wolf, Villager, Caster, Shaman, Hunter, Lunatic },
  data(): NightData {
    return {
      game: null,
      day: 0,
      players: [],
      current: 0,
      victims: [],
      huntTarget: [],
    };
  },
  methods: {
    setVictim(victim: Player) {
      this.victims.push(victim);
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
