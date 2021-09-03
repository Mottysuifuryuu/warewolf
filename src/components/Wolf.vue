<template>
  <div class="ma-10">
    <h1 class="my-6">あなたは人狼です</h1>
    <span>人狼は以下のメンバーです。</span>
    <ul>
      <li
        v-for="wolf in wolfPlayers.filter((player) => player.role === 'wolf')"
        :key="wolf.id"
      >
        {{ wolf.name }}
      </li>
    </ul>
    <div v-if="victims.length > 0">
      <span>味方は</span>
      <span v-for="victim in victims" :key="victim.id">{{ victim.name }}</span>
      <span>を襲撃しようとしています。</span>
    </div>
    <div class="my-6">
      誰を襲撃しますか？
      <div>
        <v-select
          v-model="target"
          :items="this.wolfPlayers"
          item-text="name"
          label="襲撃先"
          class="port"
          return-object
          :disabled="done"
        >
        </v-select>
        <v-btn :disabled="done" @click="attack()">襲撃する</v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Player } from "@/store/model";
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
    },
  },
  mounted() {
    this.wolfPlayers = this.players.filter((player) => player.diedAt === -1);
  },
});
</script>

<style scoped>
.port {
  width: 300px;
}
</style>
