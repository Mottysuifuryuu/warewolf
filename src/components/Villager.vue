<template>
  <div class="ma-10">
    <v-btn @click="setVisible(true)">表示</v-btn>
    <div v-if="visible">
      <h1 class="my-6">あなたは村人です</h1>
      <div class="my-6">
        特別な能力はありませんが、それは人狼の脅威に対して無力であるということを意味しません。
      </div>
      <v-btn @click="setDone()">確認</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Villager",
  components: {},
  props: {
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
