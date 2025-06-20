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
  shares?: { [playerId: string]: number }; // Optional shares for each player
}

// For settling up
export interface SettlementData {
  type: 'settlement';
  settledPlayerId: string;
  settledPlayerName: string;
  amount: number;
}
