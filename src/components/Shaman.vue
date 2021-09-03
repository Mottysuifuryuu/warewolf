<template>
  <div class="ma-10">
    <v-btn @click="visible = true">表示</v-btn>
    <div v-if="visible">
      <h1 class="my-6">あなたは霊媒師です</h1>
      <div>前日昼に処刑された人が人狼かどうかがわかります。</div>
      <div v-if="clock > 0 && targets.length > 0" class="my-6">
        昨日処刑された{{ targets[0].name }}は{{
          targets[0].role === "wolf" ? "人狼" : "村人"
        }}です。
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
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    targets(): Player[] {
      return this.players.filter((item) => item.diedAt === this.game.clock - 2);
    },
  },
  methods: {},
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
