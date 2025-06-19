import { Player, PlayerWithBalance, HistoryEntry } from '@/types';

/**
 * Function to calculate player balances based on game history.
 *
 * @param players - Array of players with their initial balances.
 * @param history - Array of history entries containing game and settlement data.
 * @returns Array of players with updated balances.
 */
export function calculatePlayerBalances(
  players: Player[],
  history: HistoryEntry[],
  me: Player
): PlayerWithBalance[] {
  const balances: { [key: string]: PlayerWithBalance } = players.reduce(
    (acc, player) => {
      acc[player.id] = { ...player, balance: 0 };
      return acc;
    },
    {} as Record<string, PlayerWithBalance>
  );

  history.forEach((entry) => {
    if (entry.type === 'game' && entry.participants && entry.paidBy) {
      const cost = entry.cost || 0;
      const iPaid = entry.paidBy.id === me.id;
      const payerId = entry.paidBy.id;
      const numParticipants = entry.participants.length;
      if (numParticipants === 0) return;
      const share = cost / numParticipants;

      if (iPaid) {
        entry.participants.forEach((pId) => {
          if (pId !== me.id && balances[pId]) {
            balances[pId].balance -= share;
          }
        });
      } else {
        entry.participants.forEach((pId) => {
          if (pId !== payerId) {
            balances[pId].balance -= share;
          }
        });
      }
    } else if (entry.type === 'settlement' && entry.settledPlayerId) {
      if (balances[entry.settledPlayerId]) {
        balances[entry.settledPlayerId].balance = 0;
      }
    }
  });
  return Object.values(balances);
}
