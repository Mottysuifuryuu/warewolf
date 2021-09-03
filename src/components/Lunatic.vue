<template>
  <div class="ma-10">
    <v-btn @click="visible = true">表示</v-btn>
    <div v-if="visible">
      <h1 class="my-6">あなたは狂人です</h1>
      <div class="my-6">人狼に味方し、彼らの勝利を扶けてください。</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Lunatic",
  components: {},
  data() {
    return {
      visible: false,
    };
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
