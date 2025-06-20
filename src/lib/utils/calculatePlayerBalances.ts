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
      const shares = entry.shares || {};
      const sumOfShares = Object.values(shares).reduce(
        (sum, share) => sum + share,
        0
      );
      const numParticipants = Math.max(entry.participants.length, sumOfShares);

      if (numParticipants === 0) return;

      const share = cost / numParticipants;

      if (iPaid) {
        entry.participants.forEach((pId) => {
          if (pId !== me.id && balances[pId]) {
            balances[pId].balance -= share * (shares[pId] || 1);
          }
        });
      } else {
        entry.participants.forEach((pId) => {
          if (pId !== me.id && pId !== payerId) {
            balances[pId].balance -= share * (shares[pId] || 1);
          }
        });
      }
    } else if (entry.type === 'settlement' && entry.settledPlayerId) {
      if (balances[entry.settledPlayerId] && entry.amount) {
        balances[entry.settledPlayerId].balance += entry.amount;
      }
    }
  });
  return Object.values(balances);
}

export function calculateMyBalances(friendBalances: PlayerWithBalance[]): {
  whoOwesMe: PlayerWithBalance[];
  iOwe: PlayerWithBalance[];
  myTotalBalance: number;
} {
  const whoOwesMe = friendBalances.filter((f) => f.balance < -0.01); // Use threshold for float issues
  const iOwe = friendBalances.filter((f) => f.balance > 0.01);
  const myTotalBalance = friendBalances.reduce((sum, f) => sum - f.balance, 0);
  return { whoOwesMe, iOwe, myTotalBalance };
}
