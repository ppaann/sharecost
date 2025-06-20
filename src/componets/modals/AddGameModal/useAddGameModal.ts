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

  shares?: { [playerId: string]: number };
  handleShareChange?: (playerId: string, share: number) => void;
  error: string | null;
};
const useAddGameModal = () => {
  const modal = useModal<ControllerProps>();
  const players = useAppSelector((state) => state.players.entities);
  const [error, setError] = useState<string | null>(null);
  const me = players.find((p) => p.isMe);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const { addPlayerHandler } = useAddPlayer();
  const [shares, setShares] = useState<{ [playerId: string]: number }>({});

  const { addGameHandler } = useAddGame();

  // form input
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [payerId, setPayerId] = useState<string>(me?.id || '');
  const [cost, setCost] = useState<string>('');

  const toggleParticipant = (id: string) => {
    setParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
    setShares((prev) => ({
      ...prev,
      [id]: prev[id] || 1, // Add share for new participants with default value of 1
    }));
  };

  const onOpen = () => {
    setError(null);
    setCost('');
    setPayerId(me?.id || '');
    setParticipantIds([]);
    setShares({});
    setNewPlayerName('');
    modal.onOpen();
  };

  const handleAddGame = async () => {
    await addGameHandler(cost, payerId, participantIds, shares, setError);
    // If no error was set, consider it successful
    if (!error) {
      modal.onClose();
      setCost('');
      setPayerId(me?.id || '');
      setParticipantIds([]);
      setShares({});
      setNewPlayerName('');
      setError(null);
    }
  };
  const handleAddNewPlayer = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && newPlayerName.trim()) {
      await addPlayerHandler(newPlayerName);
    }
  };

  const handleShareChange = (playerId: string, share: number) => {
    setShares((prev) => ({
      ...prev,
      [playerId]: Math.max(0, share), // Ensure share is non-negative
    }));
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
    shares,
    handleShareChange,
    error: error,
  };
};

export default useAddGameModal;
