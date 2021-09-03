import { Game, Player } from "./store/model";

const KEY_GAMEID = 'WAREWOLF_GAME_ID';

class LocalDataService {

  public static setGameId(gameId: string | null) {
    if (gameId) {
      localStorage.setItem(KEY_GAMEID, gameId);
    } else {
      localStorage.removeItem(KEY_GAMEID);
    }
  }

  public static getGameId(): string | null {
    return localStorage.getItem(KEY_GAMEID);
  }
}

export default LocalDataService;