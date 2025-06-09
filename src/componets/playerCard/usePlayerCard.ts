import { Player } from '@/types/player';

export type usePlayerCardProps = {
  player: Player;
};

const usePlayerCard = ({ player }: usePlayerCardProps) => {
  const balance = player.balance || 0;
  const isOwed = balance < 0;
  const isCreditor = balance > 0;
  const balanceHighlight = Math.abs(balance) >= 50 && isOwed;

  let balanceColor = 'text-gray-400';
  if (isOwed) balanceColor = 'text-red-400';
  if (isCreditor) balanceColor = 'text-green-400';

  return {
    player,
    balance,
    isOwed,
    isCreditor,
    balanceHighlight,
    balanceColor,
  };
};
export default usePlayerCard;
