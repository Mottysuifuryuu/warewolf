<template>
  <div class="mt-6 d-flex flex-column align-center">
    <v-btn @click="setVisible(true)">表示</v-btn>
    <div v-if="visible">
      <h1 class="my-6">あなたは占い師です</h1>
      <div class="my-6 d-flex flex-column align-center">
        誰を占いますか？
        <v-select
          v-model="target"
          :items="
            this.survivors
              .slice(0, current)
              .concat(this.survivors.slice(current + 1))
          "
          item-text="name"
          label="占い先"
          class="port"
          return-object
          :disabled="done"
        >
        </v-select>
        <v-btn :disabled="done || !target" @click="cast()">占う</v-btn>
        <div v-if="done" class="mt-6">
          <b>{{ targetName }}</b
          >さんは<span
            :class="targetRole === 'wolf' ? 'red--text' : 'green--text'"
            >{{
              targetRole === "wolf" ? "人狼です" : "人狼ではありません"
            }}</span
          >。
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Player } from "@/store/model";
import Vue from "vue";

interface Data {
  target: Player | null;
  targetName: string;
  targetRole: string;
}

export default Vue.extend({
  name: "Caster",
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
    current: {
      type: Number,
      default: 0,
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
      target: null,
      targetName: "",
      targetRole: "",
    };
  },
  methods: {
    cast() {
      this.$emit("night-done", true);
      if (this.target) {
        this.targetName = this.target.name;
        this.targetRole = this.target.role;
        this.target = null;
      }
    },
    setVisible(value: boolean) {
      this.$emit("night-visible", value);
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
