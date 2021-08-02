<template>
  <div>
    <h1>プレイ人数設定</h1>
    <div class="d-flex flex-row mx-4" v-for="index in players.length" :key="index">
      <v-text-field class="mr-6" v-model="players[index - 1]"/>
      <v-btn width="60" v-if="players.length >= 4" @click="deletePlayer(index - 1)">削除</v-btn>
      <div v-if="players.length < 4" style="width: 60px" />
    </div>
    <div class="d-flex justify-center">
      <v-btn class="mr-12" @click="addPlayer()">追加</v-btn>
    </div>
    <v-row dense class="mt-8">
      <v-col
        sm="6"
        xs="12"
        v-for="(role, name) in roles" :key="role.name"
      >
        <v-card
          class="d-flex ma-4"
          :color="role.color"
        >
          <v-card-title class="ml-4">
            <h4>{{ role.name }}</h4>
          </v-card-title>
          <v-spacer/>
          <v-card-actions class="mr-6">
            <el-input-number
              ref="numberInput"
              v-model.number="role.count"
              :min="name === 'wolf' ? 1 : 0"
              :max="name === 'wolf' ? (players.length - 1 - roles.fox.count) / 2 : players.length - roleSum + role.count"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Players',
  components: {
  },
  data() {
    return {
      players: ['', '', ''],
      roles: {
        wolf: {
          name: '人狼',
          count: 1,
          color: '#C62828',
        },
        lunatic: {
          name: '狂人',
          count: 0,
          color: '#C62828',
        },
        caster: {
          name: '占い師',
          count: 1,
          color: '#689F38',
        },
        shaman: {
          name: '霊媒師',
          count: 0,
          color: '#689F38',
        },
        hunter: {
          name: '狩人',
          count: 0,
          color: '#689F38',
        },
        villager: {
          name: '村人',
          count: 0,
          color: '#689F38',
        },
        syncronizer: {
          name: '共有者',
          count: 0,
          color: '#689F38',
        },
        somnubulist: {
          name: '逃亡者',
          count: 0,
          color: '#689F38',
        },
        chaser: {
          name: '追跡者',
          count: 0,
          color: '#689F38',
        },
        fox: {
          name: '妖狐',
          count: 0,
          color: '#FFEE58',
        },
      },
    }
  },
  computed: {
    roleSum(): number {
      let sum = 0;
      for (const role of Object.values(this.roles)) {
        sum += role.count;
      }
      return sum;
    },
  },
  methods: {
    deletePlayer(index: number) {
      this.players.splice(index, 1);
    },
    addPlayer() {
      this.players.push('');
    },
  },
  mounted() {
    //
  },
})
</script>

<style scoped>
.v-text-field >>> input {
  font-size: 1.4em;
  text-transform: capitalize;
}
</style>
<style>
input {
  pointer-events: none;
}
</style>>