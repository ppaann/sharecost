import { Player, HistoryEntry, PlayerWithBalance } from '@/types';

/**
 * Function to calculate player balances based on game history.
 *
 * @param players - Array of players with their initial balances.
 * @param history - Array of history entries containing game and settlement data.
 * @returns Array of players with updated balances.
 */
export function calculatePlayerBalances(
  players: Player[],
  history: HistoryEntry[]
) {
  const balances: { [key: string]: PlayerWithBalance } = players.reduce(
    (acc, player) => {
      acc[player.id] = { ...player, balance: 0 };
      return acc;
    },
    {} as { [key: string]: PlayerWithBalance }
  );

  history.forEach((entry) => {
    if (entry.type === 'game' && entry.participants && entry.paidBy) {
      const cost = entry.cost || 0;
      const numParticipants = entry.participants.length;
      if (numParticipants === 0) return;
      const share = cost / numParticipants;
      entry.participants.forEach((pId) => {
        if (balances[pId]) balances[pId].balance -= share;
      });
      if (balances[entry.paidBy.id]) balances[entry.paidBy.id].balance += cost;
    } else if (entry.type === 'settlement' && entry.playerId) {
      if (balances[entry.playerId])
        balances[entry.playerId].balance += entry.amount || 0;
    }
  });
  return Object.values(balances);
}
