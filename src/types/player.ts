export interface Player {
  id: string;
  name: string;
  isMe?: boolean;
}

export interface PlayerWithBalance extends Player {
  balance: number;
}

export interface User extends Player {
  email: string;
  image: string;
  displayName: string;
}
