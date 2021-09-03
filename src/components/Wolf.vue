<template>
  <div class="ma-10">
    <v-btn @click="setVisible(true)">表示</v-btn>
    <div v-if="visible">
      <h1 class="my-6">あなたは人狼です</h1>
      <span>人狼は以下のメンバーです。</span>
      <ul>
        <li
          v-for="wolf in players.filter((player) => player.role === 'wolf')"
          :key="wolf.id"
        >
          {{ wolf.name }}
        </li>
      </ul>
      <div v-if="victims.length > 0">
        <span>味方は、以下を襲撃しようとしています。</span>
        <ul>
          <li v-for="victim in victims" :key="victim.id">{{ victim.name }}</li>
        </ul>
      </div>
      <div class="my-6" v-if="game.clock !== -1">
        誰を襲撃しますか？
        <div>
          <v-select
            v-model="target"
            :items="this.survivors"
            item-text="name"
            label="襲撃先"
            class="port"
            return-object
            :disabled="done"
          >
          </v-select>
          <v-btn :disabled="done || !target" @click="attack()">襲撃する</v-btn>
        </div>
      </div>
      <v-btn v-if="game.clock === -1" @click="setDone()">確認</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Game, Player } from "@/store/model";
import Vue from "vue";

interface Data {
  done: boolean;
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
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data(): Data {
    return {
      done: false,
      wolfPlayers: [],
      target: null,
    };
  },
  methods: {
    attack() {
      this.$emit("victim", this.target);
      this.done = true;
      this.$emit("night-done", this.done);
    },
    setVisible(value: boolean) {
      this.$emit("night-visible", value);
    },
    setDone() {
      if (this.game.clock === -1) {
        this.done = true;
        this.$emit("night-done", this.done);
      }
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
