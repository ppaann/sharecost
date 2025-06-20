import { useState } from 'react';
import useModal from '../useModal';
import { useAddPlayer } from '@/hooks';

type ControllerProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onAdd: () => void;
  name: string;
  setName: (name: string) => void;
};

const useAddPlayerModal = (): ControllerProps => {
  const { addPlayerHandler } = useAddPlayer();
  const modal = useModal();

  const [name, setName] = useState('');

  const onClose = () => {
    modal.onClose();
    setName('');
  };

  const onAdd = async () => {
    await addPlayerHandler(name);
    onClose();
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
