import Modal from '../Modal';

type AddGameModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
  players: { id: string; name: string }[];
  cost: number;
  setCost: (cost: number) => void;
  payerId: string;
  setPayerId: (payerId: string) => void;
  participants: string[];
  toggleParticipant: (playerId: string) => void;
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
  error,
}: AddGameModalProps) => (
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
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          placeholder='e.g., 20.00'
          className='w-full bg-gray-700 border-gray-600 rounded-lg p-3'
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
export default AddGameModal;
