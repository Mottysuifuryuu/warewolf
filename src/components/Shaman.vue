<template>
  <div class="ma-10">
    <v-btn @click="setVisible(true)">表示</v-btn>
    <div v-if="visible">
      <h1 class="my-6">あなたは霊媒師です</h1>
      <div>前日昼に処刑された人が人狼かどうかがわかります。</div>
      <div v-if="game.clock > 0 && targets.length > 0" class="my-6">
        昨日処刑された{{ targets[0].name }}は{{
          targets[0].role === "wolf" ? "人狼" : "村人"
        }}です。
      </div>
      <div>
        <v-btn @click="setDone()">確認</v-btn>
      </div>
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
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      done: false,
    };
  },
  computed: {
    targets(): Player[] {
      return this.players.filter((item) => item.diedAt === this.game.clock - 2);
    },
  },
  methods: {
    setVisible(value: boolean) {
      this.$emit("night-visible", value);
    },
    setDone() {
      this.done = true;
      this.$emit("night-done", this.done);
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
