import { Player, PlayerWithBalance, HistoryEntry } from '@/types';

/**
 * Function to calculate player balances based on game history.
 *
 * @param players - Array of players with their initial balances.
 * @param history - Array of history entries containing game and settlement data.
 * @returns Array of players with updated balances.
 */
export function calculatePlayerBalances(
  friends: Player[],
  history: HistoryEntry[],
  me: Player
): PlayerWithBalance[] {
  const balances: { [key: string]: PlayerWithBalance } = friends.reduce(
    (acc, friend) => {
      acc[friend.id] = { ...friend, balance: 0 };
      return acc;
    },
    {} as Record<string, PlayerWithBalance>
  );

  // console.log('Calculating balances for players:', balances);
  // console.log('Using history entries:', history);

  history.forEach((entry) => {
    if (entry.type === 'game' && entry.participants && entry.paidBy) {
      const cost = entry.cost || 0;
      const iPaid = entry.paidBy.id === me.id;
      const payerId = entry.paidBy.id;
      const numParticipants = entry.participants.length;
      if (numParticipants === 0) return;
      const share = cost / numParticipants;
      console.log(balances, payerId);

      balances[payerId].balance += cost - share;
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
        const amount = balances[entry.settledPlayerId].balance;
        balances[me.id].balance -= amount;
        balances[entry.settledPlayerId].balance = 0;
      }
    }
  });
  return Object.values(balances);
}
