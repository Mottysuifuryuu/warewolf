<template>
  <div class="ma-10">
    <v-btn @click="visible = true">表示</v-btn>
    <div v-if="visible">
      <h1 class="my-6">あなたは狩人です</h1>
      <div class="my-6">
        誰を護衛しますか？
        <div>
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
            <span>{{ target.name }}</span>
            <span>を護衛しました。</span>
          </div>
          <v-btn @click="protect()" :disabled="done">護衛する</v-btn>
        </div>
        <div>自衛は{{ selfProtection ? "可能" : "不可能" }}です。</div>
        <div>
          連続護衛は{{ consectiveProtection ? "可能" : "不可能" }}です。
        </div>
      </div>
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
  visible: boolean;
}

export default Vue.extend({
  name: "Hunter",
  components: {},
  props: {
    players: {
      type: Array as () => string[],
      required: true,
    },
    survivors: {
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
      visible: false,
    };
  },
  methods: {
    protect() {
      this.$emit("huntTargets", this.target);
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
