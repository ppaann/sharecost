import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { addPlayer } from '@/lib/redux/playersSlice';
import useModal from '../useModal';

type ControllerProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAdd: () => void;
  name: string;
  setName: (name: string) => void;
};

const useAddPlayerModal = (): ControllerProps => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.entities);
  const loading = useAppSelector((state) => state.players.loading);

  const modal = useModal();

  const [name, setName] = useState('');

  const onClose = () => {
    modal.onClose();
    setName('');
  };

  const onAdd = () => {
    if (!name.trim()) {
      alert('Player name cannot be empty');
      return;
    }
    if (
      players.some((player) => player.name.toLowerCase() === name.toLowerCase())
    ) {
      alert('Player already exists');
      return;
    }
    if (loading === 'pending') {
      alert('Please wait, another operation is in progress');
      return;
    }
    dispatch(addPlayer(name.trim()))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error('Failed to add player:', error);
        alert('Failed to add player. Please try again.');
      });
  };

  return {
    isOpen: modal.isOpen,
    onOpen: modal.onOpen,
    onClose: modal.onClose,
    onAdd,
    name,
    setName,
  };
};
export default useAddPlayerModal;
