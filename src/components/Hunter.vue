<template>
  <div class="ma-10">
    <h1 class="my-6">あなたは狩人です</h1>
    <div class="my-6">
      誰を護衛しますか？
      <div>
        <v-select
          v-model="target"
          :items="this.players"
          item-text="name"
          label="護衛先"
          class="port"
          return-object
          :disabled="done"
        >
        </v-select>
        <v-btn @click="protect()" :disabled="done">護衛する</v-btn>
      </div>
      <div>自衛は{{ selfProtection ? "可能" : "不可能" }}</div>
      <div>連続護衛は{{ consectiveProtection ? "可能" : "不可能" }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Player } from "@/store/model";
import Vue from "vue";

interface Data {
  done: boolean;
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
  },
  data() {
    return {
      selfProtection: true,
      consectiveProtection: true,
      done: false,
      target: null,
    };
  },
  methods: {
    protect() {
      this.$emit("huntTarget", this.target);
      this.done = true;
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
