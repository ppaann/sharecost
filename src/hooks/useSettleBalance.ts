import { useDispatch } from 'react-redux';
import { Player, SettlementData } from '@/types';

const useSettleBalance = () => {
  const dispatch = useDispatch();

  const settleBalance = (playerBalances: Player[], playerId: string) => {
    const player = playerBalances.find((p) => p.id === playerId);
    if (!player || player.balance >= 0) return;
    const settlementData: SettlementData = {
      playerId: player.id,
      playerName: player.name,
      amount: -player.balance,
      type: 'settlement',
    };

    dispatch({ type: 'settleBalance', payload: settlementData });
  };

  return { settleBalance };
};

export default useSettleBalance;
