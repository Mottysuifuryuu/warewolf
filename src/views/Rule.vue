<template>
  <div>
    <h1>ルール</h1>
    <v-switch v-model="selfProtection" label="自衛アリ"/>
    <v-switch v-model="sacrifice" label="初日犠牲者アリ(人狼に噛まれる可能性のある役職からランダムに一つが初日犠牲者に割り当てられます)"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Rule',
  components: {
  },
  data() {
    return {
      selfProtection: true,
      sacrifice: false
    }
  },
  methods: {

  },
  mounted() {
    //
  },
})
</script>

<style scoped>

</style>