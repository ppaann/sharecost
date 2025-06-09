import { Player } from './player';
import { HistoryEntry } from './HistoryEntry';

export type Data = {
  players: Player[];
  history: HistoryEntry[];
};
