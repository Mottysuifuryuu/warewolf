<template>
  <div class="ma-10">
    <v-btn @click="setVisible(true)">表示</v-btn>
    <div v-if="visible">
      <h1 class="my-6">あなたは狂人です</h1>
      <div class="my-6">人狼に味方し、彼らの勝利を扶けてください。</div>
      <v-btn @click="setDone()">確認</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Lunatic",
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      done: true,
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
