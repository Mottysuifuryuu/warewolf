<template>
  <div class="ma-10">
    <v-btn @click="setVisible(true)">表示</v-btn>
    <div v-if="visible">
      <h1 class="my-6">あなたは占い師です</h1>
      <div class="my-6">
        誰を占いますか？
        <div>
          <v-select
            v-model="target"
            :items="this.survivors"
            item-text="name"
            label="占い先"
            class="port"
            return-object
            :disabled="done"
          >
          </v-select>
          <v-btn :disabled="done || !target" @click="cast()">占う</v-btn>
        </div>
        <div class="ma-6 bold" v-if="done">
          {{ target.name }}は{{
            target.role === "wolf" ? "人狼" : "村人"
          }}です。
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

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
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      target: "",
      done: false,
    };
  },
  methods: {
    cast() {
      this.done = true;
      this.$emit("night-done", this.done);
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
