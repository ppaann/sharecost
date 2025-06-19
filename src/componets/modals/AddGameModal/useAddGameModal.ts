import { useState } from 'react';
import { Player, GameData } from '@/types';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { addGame } from '@/lib/redux/historySlice';
import useModal from '../useModal';

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
  const dispatch = useAppDispatch();
  const modal = useModal<ControllerProps>();
  const players = useAppSelector((state) => state.players.entities);
  const [error, setError] = useState<string | null>(null);

  // form input
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [payerId, setPayerId] = useState<string>('');
  const [cost, setCost] = useState<string>('');

  const toggleParticipant = (id: string) => {
    setParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const onOpen = () => {
    setError(null);
    setCost('');
    setPayerId('');
    setParticipantIds([]);
    modal.onOpen();
  };

  const handleAddGame = async () => {
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
    };

    dispatch(addGame(gameData))
      .unwrap()
      .then(() => {
        setCost('');
        setPayerId('');
        setParticipantIds([]);
        modal.onClose();
        setError('');
      })
      .catch((err) => setError(err.message));
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
    error: error,
  };
};

export default useAddGameModal;
