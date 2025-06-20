import { addPlayer } from '@/lib/redux/playersSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';

const useAddPlayer = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.entities);

  const addPlayerHandler = async (name: string) => {
    const inputName = name.trim();
    if (inputName.length === 0) {
      alert('Player name cannot be empty');
      return;
    }
    if (
      players.some(
        (player) => player.name.toLowerCase() === inputName.toLowerCase()
      )
    ) {
      alert('Player already exists');
      return;
    }
    try {
      await dispatch(addPlayer({ name: inputName, isMe: false })).unwrap();
    } catch (error) {
      console.error('Failed to add player:', error);
      alert('Failed to add player. Please try again.');
    }
  };

  return { addPlayerHandler };
};
export default useAddPlayer;
