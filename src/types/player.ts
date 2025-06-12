export interface Player {
  id: string;
  name: string;
}

export interface PlayerWithBalance extends Player {
  balance: number;
}
