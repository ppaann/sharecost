import { addGame } from '@/lib/redux/historySlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { GameData } from '@/types';

const useAddGame = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.entities);

  const addGameHandler = async (
    cost: string,
    payerId: string,
    participantIds: string[],
    shares: { [playerId: string]: number },
    setError: (error: string | null) => void
  ) => {
    if (!cost || !payerId || participantIds.length === 0) {
      setError(
        'Please fill all fields: cost, payer, and at least one participant.'
      );
      return;
    }
    if (isNaN(Number(cost)) || Number(cost) <= 0) {
      setError('Invalid cost amount.');
      return;
    }
    const payerDetails = players.find((p) => p.id === payerId);
    if (!payerDetails) {
      setError('Payer not found.');
      return;
    }

    const gameData: GameData = {
      type: 'game',
      cost: Number(cost),
      paidBy: { id: payerDetails.id, name: payerDetails.name },
      participants: participantIds,
      participantNames: participantIds.map(
        (id) => players.find((p) => p.id === id)?.name || 'Unknown'
      ),
      shares: shares || {},
    };

    try {
      await dispatch(addGame(gameData)).unwrap();
      setError(null); // Clear error on success
    } catch (error) {
      console.error('Failed to add game:', error);
      setError('Failed to add game. Please try again.');
    }
  };
  return { addGameHandler };
};

export default useAddGame;
