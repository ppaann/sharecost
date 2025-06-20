import { useEffect, useRef } from 'react';
import Modal from '../Modal';

type AddGameModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
  players: { id: string; name: string }[];
  cost: string;
  setCost: (cost: string) => void;
  payerId: string;
  setPayerId: (payerId: string) => void;
  participants: string[];
  toggleParticipant: (playerId: string) => void;
  newPlayerName: string;
  setNewPlayerName: (name: string) => void;
  handleAddNewPlayer: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string | null;
};

const AddGameModal = ({
  isOpen,
  onClose,
  onAdd,
  players,
  cost,
  setCost,
  payerId,
  setPayerId,
  participants,
  toggleParticipant,
  newPlayerName,
  setNewPlayerName,
  handleAddNewPlayer,
  error,
}: AddGameModalProps) => {
  const costInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isOpen && costInputRef.current) {
      costInputRef.current.focus();
    }
  }, [isOpen, costInputRef]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className='text-2xl font-bold mb-6 text-white'>Log a New Game</h2>
      {error && (
        <div className='bg-red-500/20 text-red-300 p-3 rounded-lg mb-4'>
          {error}
        </div>
      )}
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-400 mb-1'>
            Total Cost ($)
          </label>
          <input
            type='number'
            name='cost'
            autoComplete='off'
            autoFocus
            required
            min='0'
            step='0.01'
            title='Please enter a valid cost (e.g., 20.00)'
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder='e.g., 20.00'
            className='w-full bg-gray-700 border-gray-600 rounded-lg p-3'
            ref={costInputRef}
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-400 mb-1'>
            Who Paid?
          </label>
          <select
            value={payerId}
            onChange={(e) => setPayerId(e.target.value)}
            className='w-full bg-gray-700 border-gray-600 rounded-lg p-3 appearance-none'
          >
            <option value=''>Select a player</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-400 mb-2'>
            Who Played?
          </label>
          <div className='max-h-48 overflow-y-auto space-y-2 p-2 bg-gray-900 rounded-md'>
            {players.map((p) => (
              <div
                key={p.id}
                onClick={() => toggleParticipant(p.id)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  participants.includes(p.id)
                    ? 'bg-blue-600/50'
                    : 'bg-gray-700/50 hover:bg-gray-700'
                }`}
              >
                <span className='font-medium'>{p.name}</span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    participants.includes(p.id)
                      ? 'bg-blue-500 border-blue-400'
                      : 'border-gray-500'
                  }`}
                >
                  {participants.includes(p.id) && (
                    <span className='text-white'>✓</span>
                  )}
                </div>
              </div>
            ))}
            <div>
              <input
                type='text'
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                placeholder='Add new player'
                onKeyDown={handleAddNewPlayer}
                className='w-full bg-gray-600 border-gray-500 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onAdd}
        className='w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg'
      >
        Record Game
      </button>
    </Modal>
  );
};
export default AddGameModal;
