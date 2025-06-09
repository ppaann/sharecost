export type HistoryEntry = {
  id: string;
  type: 'game' | 'individual';
  participants?: string[]; // Array of player IDs
  paidBy?: string; // Player ID who paid
  amount?: number;
  [key: string]: unknown; // Additional fields for flexibility
};
