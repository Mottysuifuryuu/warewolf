<template>
  <div class="mt-6 d-flex flex-column align-center">
    <v-btn @click="setVisible(true)">表示</v-btn>
    <div class="d-flex flex-column align-center" v-if="visible">
      <h1 class="my-6">あなたは霊媒師です</h1>
      <div>前日昼に処刑された人が人狼かどうかがわかります。</div>
      <div v-if="game.clock > 0 && targets.length > 0" class="my-6">
        昨日処刑された<b>{{ targets[0].name }}</b
        >さんは
        <span :class="targets[0].role === 'wolf' ? 'red--text' : 'green--text'">
          {{ targets[0].role === "wolf" ? "人狼です" : "人狼ではありません" }}
        </span>
        。
      </div>
      <v-btn class="mt-6" @click="setDone()">確認</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Game, Player } from "@/store/model";

export default Vue.extend({
  name: "Shaman",
  components: {},
  props: {
    players: {
      type: Array as () => Player[],
      required: true,
    },
    game: {
      type: Object as () => Game,
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
  data() {
    return {};
  },
  computed: {
    targets(): Player[] {
      return this.players.filter((item) => item.diedAt === this.game.clock - 1);
    },
  },
  methods: {
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
