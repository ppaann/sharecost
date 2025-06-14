import { useAppDispatch } from '@/lib/redux/store';
import { Player, SettlementData } from '@/types';
import { settleBalance } from '@/lib/redux/historySlice'; // Import the action to settle balance

const useSettleBalance = () => {
  const dispatch = useAppDispatch();

  const handleSettleBalance = (playerBalances: Player[], playerId: string) => {
    const player = playerBalances.find((p) => p.id === playerId);
    if (!player || player.balance >= 0) return;
    const settlementData: SettlementData = {
      playerId: player.id,
      playerName: player.name,
      amount: -player.balance,
      type: 'settlement',
    };

    dispatch(settleBalance(settlementData))
      .unwrap()
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error('Failed to settle balance:', error.message);
        } else {
          console.error('Failed to settle balance:', error);
        }
      });
  };

  return handleSettleBalance;
};

export default useSettleBalance;
