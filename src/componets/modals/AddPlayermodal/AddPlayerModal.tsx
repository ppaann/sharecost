import Modal from '../Modal';
import React, { useEffect, useRef } from 'react';

type AddPlayerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
  name: string;
  setName: (name: string) => void;
};

const AddPlayerModal = ({
  isOpen,
  onClose,
  onAdd,
  name,
  setName,
}: AddPlayerModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className='text-2xl font-bold mb-4 text-white'>Add New Player</h2>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Player's Name"
        className='w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none'
        ref={inputRef}
      />
      <button
        onClick={onAdd}
        className='w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors'
      >
        Add Player
      </button>
    </Modal>
  );
};
export default AddPlayerModal;
