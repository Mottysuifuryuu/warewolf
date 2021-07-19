<template>
  <div>
    <h1>{{ day }}日目夜</h1>
    <p>{{ member }}人目の夜行動です</p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Night',
  components: {
  },
  data() {
    return {
      day: 0,
      member: 0,
    }
  },
  mounted() {
    this.day = parseInt(this.$route.params.day);
    this.member = parseInt(this.$route.params.member);
  },
})
</script>
<style scoped>

</style>