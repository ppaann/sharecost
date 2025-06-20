export interface HistoryEntry {
  id: string;
  type: 'game' | 'settlement';
  cost?: number; // Total cost for the game or settlement
  paidBy?: { id: string; name: string }; // Player ID who paid
  participants?: string[]; // Array of player IDs
  shares?: { [playerId: string]: number }; // Shares of each player
  settledById?: string; // Who initiated the settlement (always "Me")
  settledPlayerId?: string; // The other player involved
  settledPlayerName?: string; // Name of the player who is settled
  date?: string; // ISO date string
  amount?: number;
  [key: string]: unknown; // Additional fields for flexibility
}
