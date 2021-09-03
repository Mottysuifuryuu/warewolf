<template>
  <div class="ma-10">
    <h1 class="my-6">あなたは霊媒師です</h1>
    <div>前日昼に処刑された人が人狼かどうかがわかります。</div>
    <div v-if="clock > 0" class="my-6">
      昨日処刑された{{ target }}は{{ mono }}です。
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Shaman",
  components: {},
  data() {
    return {
      target: "",
      mono: true,
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
