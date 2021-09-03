<template>
  <div class="ma-10">
    <h1 class="my-6">あなたは占い師です</h1>
    <div class="my-6">
      誰を占いますか？
      <div>
        <v-select
          v-model="target"
          :items="this.players"
          item-text="name"
          label="占い先"
          class="port"
          return-object
          :disabled="casted"
        >
        </v-select>
        <v-btn @click="casted = true">占う</v-btn>
      </div>
      <div class="ma-4" v-if="casted">
        {{ target.name }}は{{ target.role === "wolf" ? "人狼" : "村人" }}です。
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
  },
  data() {
    return {
      target: "",
      casted: false,
    };
  },
  methods: {},
  mounted() {
    //
  },
  computed: {},
});
</script>

<style scoped>
.port {
  width: 300px;
}
</style>
