import { API, graphqlOperation } from "@aws-amplify/api";
import * as gqlQueries from "@/graphql/queries";
import * as gqlMutations from "@/graphql/mutations";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Game, Player } from "@/store/model";
import { CreateGameInput, CreateGameMutation, CreatePlayerInput, CreatePlayerMutation, GetGameQuery, GetPlayerQuery, UpdateGameInput, UpdateGameMutation, UpdatePlayerInput, UpdatePlayerMutation } from "@/API";

export default class AppSyncClient {
  static notNull<T>(item: T | null | undefined): item is T {
    return item !== null && item !== undefined;
  }

  /*
    Game
  */
  static async createGame(game: Game): Promise<Game | null> {
    const input: CreateGameInput = {
      id: game.id,
      clock: game.clock,
    };
    const result = (await API.graphql(
      graphqlOperation(gqlMutations.createGame, { input })
    )) as GraphQLResult;
    const data = result.data as CreateGameMutation;
    if (data.createGame) {
      game.id = data.createGame.id;
      game.updatedAt = data.createGame.updatedAt;
      game.createdAt = data.createGame.createdAt;
      return game;
    }
    return null;
  }

  static async updateGame(game: Game): Promise<Game | null> {
    const input: UpdateGameInput = {
      id: game.id,
      clock: game.clock,
    };
    const result = (await API.graphql(
      graphqlOperation(gqlMutations.updateGame, { input })
    )) as GraphQLResult;
    const data = result.data as UpdateGameMutation;
    if (data.updateGame) {
      game.updatedAt = data.updateGame.updatedAt;
      return game;
    }
    return null;
  }

  static async getGame(id: string): Promise<Game | null> {
    const result = (await API.graphql(
      graphqlOperation(gqlQueries.getGame, { id })
    )) as GraphQLResult;
    const data = result.data as GetGameQuery;
    if (data.getGame) {
      const players: Player[] = [];
      if (data.getGame.players && data.getGame.players.items) {
        for (const player of data.getGame.players.items.filter(this.notNull)) {
          players.push({
            id: player.id,
            gameId: player.gameId,
            name: player.name,
            role: player.role,
            diedAt: player.diedAt,
            createdAt: player.createdAt,
            updatedAt: player.updatedAt,
          });
        }
      }
      const game: Game = {
        id: data.getGame.id,
        clock: data.getGame.clock,
        players,
        createdAt: data.getGame.createdAt,
        updatedAt: data.getGame.updatedAt,
      };
      return game;
    }
    return null;
  }

  /*
    Player
  */
    static async createPlayer(player: Player): Promise<Player | null> {
      const input: CreatePlayerInput = {
        id: player.id,
        gameId: player.gameId,
        name: player.name,
        role: player.role,
        diedAt: player.diedAt,
      };
      const result = (await API.graphql(
        graphqlOperation(gqlMutations.createPlayer, { input })
      )) as GraphQLResult;
      const data = result.data as CreatePlayerMutation;
      if (data.createPlayer) {
        player.id = data.createPlayer.id;
        player.updatedAt = data.createPlayer.updatedAt;
        player.createdAt = data.createPlayer.createdAt;
        return player;
      }
      return null;
    }
  
    static async updatePlayer(player: Player): Promise<Player | null> {
      if (player.id) {
        const input: UpdatePlayerInput = {
          id: player.id,
          gameId: player.gameId,
          name: player.name,
          role: player.role,
          diedAt: player.diedAt,
        };
        const result = (await API.graphql(
          graphqlOperation(gqlMutations.updatePlayer, { input })
        )) as GraphQLResult;
        const data = result.data as UpdatePlayerMutation;
        if (data.updatePlayer) {
          player.updatedAt = data.updatePlayer.updatedAt;
          return player;
        }
      }
      return null;
    }
  
    static async getPlayer(id: string): Promise<Player | null> {
      const result = (await API.graphql(
        graphqlOperation(gqlQueries.getPlayer, { id })
      )) as GraphQLResult;
      const data = result.data as GetPlayerQuery;
      if (data.getPlayer) {
        const player: Player = {
          id: data.getPlayer.id,
          gameId: data.getPlayer.gameId,
          name: data.getPlayer.name,
          role: data.getPlayer.role,
          diedAt: data.getPlayer.diedAt,
          createdAt: data.getPlayer.createdAt,
          updatedAt: data.getPlayer.updatedAt,
        };
        return player;
      }
      return null;
    }
}
