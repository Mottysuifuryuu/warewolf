<template>
  <div>
    <h1 class="ma-12">プレイ人数設定</h1>
    <div
      class="d-flex flex-row mx-4"
      v-for="(player, index) in players"
      :key="index"
    >
      <v-text-field class="mx-6" v-model="player.name" />
      <v-btn
        width="60"
        v-if="players.length >= 4"
        @click="deletePlayer(index - 1)"
        >削除</v-btn
      >
      <div v-if="players.length < 4" style="width: 60px" />
    </div>
    <div class="d-flex justify-center">
      <v-btn class="mr-12" @click="addPlayer()">追加</v-btn>
    </div>
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
    <div>
      <v-col align="center" justify="space-around">
        <v-btn class="my-5" x-large dark color="indigo" @click="back()"
          >戻る</v-btn
        >
        <div v-if="roleSum === players.length">
          <v-btn class="my-5" x-large dark color="indigo" @click="apply()"
            >決定</v-btn
          >
        </div>
      </v-col>
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
        {
          id: "synchronizer",
          name: "共有者",
          count: 0,
          color: "#689F38",
        },
        {
          id: "somnubulist",
          name: "逃亡者",
          count: 0,
          color: "#689F38",
        },
        {
          id: "chaser",
          name: "追跡者",
          count: 0,
          color: "#689F38",
        },
        {
          id: "fox",
          name: "妖狐",
          count: 0,
          color: "#FFEE58",
        },
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
      await AppSyncClient.createGame({
        id: this.gameId,
        clock: -1,
        players: [],
      });
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
  text-transform: capitalize;
}
</style>
<style>
input {
  pointer-events: none;
}</style
>>
