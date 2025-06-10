import { Player } from './';

export interface HistoryEntry {
  id: string;
  type: 'game' | 'settlement';
  cost?: number; // Total cost for the game or settlement
  paidBy?: { id: string; name: string }; // Player ID who paid
  participants?: string[]; // Array of player IDs
  date?: string; // ISO date string
  amount?: number;
  [key: string]: unknown; // Additional fields for flexibility
}

export interface PlayerWithBalance extends Player {
  balance: number;
}

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
  playerId: string;
  playerName: string;
  amount: number;
}
