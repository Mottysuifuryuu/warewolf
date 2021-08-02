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
  role: number;
  diedAt: number;
  createdAt?: string;
  updatedAt?: string;
}