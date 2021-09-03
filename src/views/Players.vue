<template>
  <div class="d-flex flex-column align-center">
    <h1 class="ma-12">プレイ人数設定</h1>
    <div
      style="width: 50%;"
      class="d-flex flex-row"
      v-for="(player, index) in players"
      :key="index"
    >
      <v-text-field v-model="player.name" class="ml-8" />
      <v-btn
        class="red white--text ml-8"
        :disabled="players.length < 4"
        @click="deletePlayer(index)"
        >削除</v-btn
      >
    </div>
    <v-btn @click="addPlayer()">追加</v-btn>
    <v-row dense class="mt-8">
      <v-col sm="6" xs="12" v-for="role in roles" :key="role.name">
        <v-card class="d-flex ma-4" :color="role.color">
          <v-card-title class="ml-4">
            <h4>{{ role.name }}</h4>
          </v-card-title>
          <v-spacer />
          <v-card-actions class="mr-6">
            <el-input-number
              ref="numberInput"
              v-model.number="role.count"
              :min="role.id === 'wolf' ? 1 : 0"
              :max="
                role.id === 'wolf'
                  ? (players.length - 1 - roles.slice(-1)[0].count) / 2
                  : players.length - roleSum + role.count
              "
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div class="d-flex justify-space-around mt-3" style="width: 100%;">
      <v-btn x-large @click="back()">戻る</v-btn>
      <v-btn
        :disabled="
          roleSum !== players.length || players.find((item) => item.name === '')
        "
        class="white--text"
        x-large
        color="indigo"
        @click="apply()"
        >決定</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "@/router/index";
import AppSyncClient from "@/api/AppSyncClient";
import LocalDataService from "@/LocalDataService";
import { Player, Role } from "@/store/model";
import { shuffle } from "@/utils/Common";

interface PlayersData {
  gameId: string;
  players: Player[];
  roles: Role[];
}

export default Vue.extend({
  name: "Players",
  components: {},
  data(): PlayersData {
    return {
      gameId: "",
      players: [
        {
          gameId: "",
          name: "",
          role: "",
          diedAt: -1,
        },
        {
          gameId: "",
          name: "",
          role: "",
          diedAt: -1,
        },
        {
          gameId: "",
          name: "",
          role: "",
          diedAt: -1,
        },
      ],
      roles: [
        {
          id: "wolf",
          name: "人狼",
          count: 1,
          color: "#C62828",
        },
        {
          id: "lunatic",
          name: "狂人",
          count: 0,
          color: "#C62828",
        },
        {
          id: "caster",
          name: "占い師",
          count: 1,
          color: "#689F38",
        },
        {
          id: "shaman",
          name: "霊媒師",
          count: 0,
          color: "#689F38",
        },
        {
          id: "hunter",
          name: "狩人",
          count: 0,
          color: "#689F38",
        },
        {
          id: "villager",
          name: "村人",
          count: 0,
          color: "#689F38",
        },
        // {
        //   id: "synchronizer",
        //   name: "共有者",
        //   count: 0,
        //   color: "#689F38",
        // },
        // {
        //   id: "somnubulist",
        //   name: "逃亡者",
        //   count: 0,
        //   color: "#689F38",
        // },
        // {
        //   id: "chaser",
        //   name: "追跡者",
        //   count: 0,
        //   color: "#689F38",
        // },
        // {
        //   id: "fox",
        //   name: "妖狐",
        //   count: 0,
        //   color: "#FFEE58",
        // },
      ],
    };
  },
  computed: {
    roleSum(): number {
      let sum = 0;
      for (const role of this.roles) {
        sum += role.count;
      }
      return sum;
    },
    roleList(): string[] {
      const result: string[] = [];
      for (const role of this.roles) {
        [...Array(role.count)].map(() => {
          result.push(role.id);
        });
      }
      return result;
    },
  },
  methods: {
    deletePlayer(index: number) {
      this.players.splice(index, 1);
    },
    addPlayer() {
      this.players.push({
        gameId: "",
        name: "",
        role: "",
        diedAt: -1,
      });
    },
    back() {
      router.push({ name: "Home" });
    },
    async apply() {
      const shuffledRoleList = shuffle(this.roleList);
      for (const player of this.players) {
        player.gameId = this.gameId;
        player.role = shuffledRoleList.shift();
        await AppSyncClient.createPlayer(player);
      }
      router.push({ name: "Night" });
    },
  },
  mounted() {
    const gameId = LocalDataService.getGameId();
    if (gameId) {
      this.gameId = gameId;
    }
  },
});
</script>

<style scoped>
.v-text-field >>> input {
  font-size: 1.4em;
}
</style>
<style>
input {
  pointer-events: none;
}</style
>>
