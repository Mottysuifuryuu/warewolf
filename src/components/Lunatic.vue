<template>
  <div class="mt-6 d-flex flex-column align-center">
    <v-btn @click="setVisible(true)">表示</v-btn>
    <div v-if="visible" class="d-flex flex-column align-center">
      <h1 class="my-6">あなたは狂人です</h1>
      <div class="my-6">人狼に味方し、彼らの勝利を助けてください。</div>
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
