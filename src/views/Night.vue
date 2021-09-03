<template>
  <div class="d-flex flex-column align-center" v-if="survivors.length > 0">
    <div
      class="mt-10 d-flex flex-column align-center"
      v-if="survivors.length > current"
    >
      <h1>{{ day }}日目夜</h1>
      <p>
        <b>{{ survivors[current].name }}</b
        >さんの夜行動です。
      </p>
      <p>
        <b>{{ survivors[current].name }}</b
        >さん本人が下のボタンを押してください。
      </p>
      <Wolf
        v-if="survivors[current].role === 'wolf'"
        :players="players"
        :survivors="survivors"
        :victims="victims"
        :game="game"
        :done="nightDone"
        :visible="visible"
        @victim="setVictim($event)"
        @night-done="setDone($event)"
        @night-visible="setVisible($event)"
      />
      <Villager
        v-if="survivors[current].role === 'villager'"
        :done="nightDone"
        :visible="visible"
        @night-done="setDone($event)"
        @night-visible="setVisible($event)"
      />
      <Caster
        v-if="survivors[current].role === 'caster'"
        :players="players"
        :survivors="survivors"
        :current="current"
        :done="nightDone"
        :visible="visible"
        @night-done="setDone($event)"
        @night-visible="setVisible($event)"
      />
      <Shaman
        v-if="survivors[current].role === 'shaman'"
        :players="players"
        :game="game"
        :done="nightDone"
        :visible="visible"
        @night-done="setDone($event)"
        @night-visible="setVisible($event)"
      />
      <Hunter
        v-if="survivors[current].role === 'hunter'"
        :players="players"
        :game="game"
        :survivors="survivors"
        :done="nightDone"
        :visible="visible"
        @huntTargets="hunt($event)"
        @night-done="setDone($event)"
        @night-visible="setVisible($event)"
      />
      <Lunatic
        v-if="survivors[current].role === 'lunatic'"
        :done="nightDone"
        :visible="visible"
        @night-done="setDone($event)"
        @night-visible="setVisible($event)"
      />
      <v-btn v-if="nightDone" class="indigo mt-6" dark @click="next()"
        >次の人へ渡す</v-btn
      >
    </div>
    <div class="ma-12" v-if="survivors.length <= current">
      全員の行動が完了しました。
      <div class="ma-10">
        <v-btn class="indigo" dark @click="daybreak()">夜明けへ</v-btn>
      </div>
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
  huntTargets: Player[];
  nightDone: boolean;
  visible: boolean;
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
      huntTargets: [],
      nightDone: false,
      visible: false,
    };
  },
  computed: {
    survivors(): Player[] {
      return this.players.filter((item) => item.diedAt === -1);
    },
  },
  methods: {
    async daybreak() {
      const lastVictim = this.victims.pop();
      let critical = "";
      if (lastVictim) {
        const preCriticals = this.huntTargets.filter(
          (item) => item.id === lastVictim.id
        );
        if (preCriticals.length === 0) {
          if (lastVictim.id) {
            critical = lastVictim.id;
          }
        }
      }
      if (this.game) {
        this.game.clock += 1;
        await AppSyncClient.updateGame(this.game);
        if (lastVictim) {
          if (critical !== "") {
            lastVictim.diedAt = this.game.clock;
            await AppSyncClient.updatePlayer(lastVictim);
          }
        }
      }
      router.push({ name: "Dawn" });
    },
    setVictim(victim: Player) {
      this.victims.push(victim);
    },
    hunt(huntTargets: Player) {
      this.huntTargets.push(huntTargets);
    },
    setDone(value: boolean) {
      this.nightDone = value;
    },
    setVisible(value: boolean) {
      this.visible = value;
    },
    next() {
      this.current += 1;
      this.visible = false;
      this.nightDone = false;
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
