<template>
  <div class="mt-6 d-flex flex-column align-center">
    <v-btn @click="setVisible(true)">表示</v-btn>
    <div v-if="visible" class="d-flex flex-column align-center">
      <h1 class="my-6">あなたは狩人です</h1>
      <p>毎晩一人を選び、人狼による襲撃から対象を守ることが出来ます。</p>
      <div
        class="my-6 d-flex flex-column align-center"
        v-if="game.clock !== -1"
      >
        誰を護衛しますか？
        <v-select
          v-model="target"
          :items="this.survivors"
          item-text="name"
          label="護衛先"
          class="port"
          return-object
          :disabled="done"
        >
        </v-select>
        <div v-if="done">
          <span
            ><b>{{ target.name }}</b
            >さんを護衛しました。</span
          >
        </div>
        <v-btn @click="protect()" :disabled="done || !target">護衛する</v-btn>
        <div class="mt-6">
          自衛は{{ selfProtection ? "可能" : "不可能" }}です。
        </div>
        <div>
          連続護衛は{{ consectiveProtection ? "可能" : "不可能" }}です。
        </div>
      </div>
      <v-btn class="mt-6" v-else @click="setDone()">確認</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Game, Player } from "@/store/model";
import Vue from "vue";

interface Data {
  selfProtection: boolean;
  consectiveProtection: boolean;
  target: Player | null;
}

export default Vue.extend({
  name: "Hunter",
  components: {},
  props: {
    players: {
      type: Array as () => string[],
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
      selfProtection: true,
      consectiveProtection: true,
      target: null,
    };
  },
  methods: {
    protect() {
      this.$emit("huntTargets", this.target);
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
