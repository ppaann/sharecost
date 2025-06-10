import { Player } from './player';
import { HistoryEntry } from './historyEntry';

export type Data = {
  players: Player[];
  history: HistoryEntry[];
};

// For creating new games
export interface GameData {
  type: 'game';
  cost: number;
  paidBy: { id: string; name: string };
  participants: string[];
  participantNames: string[];
}

// For settling up
export interface SettlementData {
  type: 'settlement';
  playerId: string;
  playerName: string;
  amount: number;
}
