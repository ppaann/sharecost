export interface HistoryEntry {
  id: string;
  type: 'game' | 'settlement';
  cost?: number; // Total cost for the game or settlement
  paidBy?: { id: string; name: string }; // Player ID who paid
  participants?: string[]; // Array of player IDs
  date?: string; // ISO date string
  amount?: number;
  [key: string]: unknown; // Additional fields for flexibility
  playerId?: string;
  playerName?: string;
}
