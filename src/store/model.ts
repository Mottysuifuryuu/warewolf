/* clockの仕様
  朝: 0 (朝になりました、誰々が死にました)
  昼: 1 (タイマー機能)
  夕: 2 (投票機能)
  夜: 3 (襲撃、能力の使用)
  
  ※ 初日夜は-1
*/
export interface Game {
  id: string;
  clock: number;
  players: Player[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Player {
  id?: string;
  gameId: string;
  name: string;
  role: string;
  diedAt: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Role {
  id: string;
  name: string;
  count: number;
  color: string;
}
