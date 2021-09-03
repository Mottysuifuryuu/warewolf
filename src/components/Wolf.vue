<template>
  <div class="mt-6 d-flex flex-column align-center">
    <v-btn @click="setVisible(true)">表示</v-btn>
    <div v-if="visible" class="d-flex flex-column align-center">
      <h1 class="my-6">あなたは人狼です</h1>
      <span>人狼は以下のメンバーです。</span>
      <ul>
        <li
          v-for="wolf in players.filter((player) => player.role === 'wolf')"
          :key="wolf.id"
        >
          {{ wolf.name }}{{ wolf.diedAt === -1 ? "" : "(死亡)" }}
        </li>
      </ul>
      <div
        class="mt-6 d-flex flex-column align-center"
        v-if="victims.length > 0"
      >
        <span>味方は、以下を襲撃しようとしています。</span>
        <ul>
          <li v-for="victim in victims" :key="victim.id">{{ victim.name }}</li>
        </ul>
      </div>
      <div
        class="my-6 d-flex flex-column align-center"
        v-if="game.clock !== -1"
      >
        誰を襲撃しますか？
        <v-select
          v-model="target"
          :items="this.survivors.filter((item) => item.role !== 'wolf')"
          item-text="name"
          label="襲撃先"
          class="port"
          return-object
          :disabled="done"
        >
        </v-select>
        <v-btn :disabled="done || !target" @click="attack()">襲撃する</v-btn>
      </div>
      <v-btn class="mt-6" v-else @click="setDone()">確認</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Game, Player } from "@/store/model";
import Vue from "vue";

interface Data {
  wolfPlayers: Player[];
  target: Player | null;
}

export default Vue.extend({
  name: "Wolf",
  components: {},
  props: {
    players: {
      type: Array as () => Player[],
      required: true,
    },
    victims: {
      type: Array as () => Player[],
      required: true,
    },
    game: {
      type: Object as () => Game,
      required: true,
    },
    survivors: {
      type: Array as () => string[],
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data(): Data {
    return {
      wolfPlayers: [],
      target: null,
    };
  },
  methods: {
    attack() {
      this.$emit("victim", this.target);
      this.target = null;
      this.$emit("night-done", true);
    },
    setVisible(value: boolean) {
      this.$emit("night-visible", value);
    },
    setDone() {
      this.$emit("night-done", true);
    },
  },
  mounted() {
    //
  },
});
</script>

<style scoped>
.port {
  width: 300px;
}
</style>
