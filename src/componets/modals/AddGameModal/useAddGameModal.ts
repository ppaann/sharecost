import { useState } from 'react';
import { Player } from '@/types';
import { useAppSelector } from '@/lib/redux/store';
import useModal from '../useModal';
import { useAddGame, useAddPlayer } from '@/hooks';

type ControllerProps = {
  players: Player[];
  cost: number;
  setCost: (cost: number) => void;
  payerId: string;
  setPayerId: (payerId: string) => void;
  participants: string[];
  toggleParticipant: (participantId: string) => void;
  handleAddGame: () => void;
  error: string | null;
};
const useAddGameModal = () => {
  const modal = useModal<ControllerProps>();
  const players = useAppSelector((state) => state.players.entities);
  const [error, setError] = useState<string | null>(null);
  const me = players.find((p) => p.isMe);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const { addPlayerHandler } = useAddPlayer();

  const { addGameHandler } = useAddGame();

  // form input
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [payerId, setPayerId] = useState<string>(me?.id || '');
  const [cost, setCost] = useState<string>('');

  const toggleParticipant = (id: string) => {
    setParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const onOpen = () => {
    setError(null);
    setCost('');
    setPayerId(me?.id || '');
    setParticipantIds([]);
    modal.onOpen();
  };

  const handleAddGame = async () => {
    await addGameHandler(cost, payerId, participantIds, setError);
    // If no error was set, consider it successful
    if (!error) {
      modal.onClose();
      setCost('');
      setPayerId(me?.id || '');
      setParticipantIds([]);
    }
  };
  const handleAddNewPlayer = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && newPlayerName.trim()) {
      await addPlayerHandler(newPlayerName);
    }
  };

  return {
    ...modal,
    onAdd: handleAddGame,
    onOpen,
    players,
    cost,
    setCost,
    payerId,
    setPayerId,
    participants: participantIds,
    toggleParticipant,
    handleAddGame,
    newPlayerName,
    setNewPlayerName,
    handleAddNewPlayer,
    error: error,
  };
};

export default useAddGameModal;
