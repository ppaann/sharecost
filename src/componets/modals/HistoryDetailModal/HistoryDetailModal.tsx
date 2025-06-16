import Modal from '../Modal';
import { HistoryEntry } from '@/types';

const HistoryDetailModal = ({
  isOpen,
  onClose,
  item,
}: {
  isOpen: boolean;
  onClose: () => void;
  item: HistoryEntry | null;
}) => {
  if (!item) return null;
  const share =
    item.type === 'game' && item.cost && item.participants?.length
      ? (item.cost / item.participants.length).toFixed(2)
      : '0.00';
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className='text-2xl font-bold mb-4 text-white'>
        {item.type === 'game' ? 'Game Details' : 'Settlement Details'}
      </h2>
      <div className='space-y-3 text-gray-300'>
        <p>
          <strong>Date:</strong>{' '}
          {new Date(item.date ? item.date : 0).toLocaleString()}
        </p>
        {item.type === 'game' && (
          <p>
            <strong>Total Cost:</strong> ${(item.cost || 0).toFixed(2)}
          </p>
        )}
        {item.type === 'settlement' && (
          <p>
            <strong>Amount:</strong> ${(item.amount || 0).toFixed(2)}
          </p>
        )}
        {item.type === 'game' ? (
          <p>
            <strong>Paid By:</strong> {item.paidBy?.name || 'Unknown'}
          </p>
        ) : (
          <p>
            <strong>Paid By:</strong> {item.settledPlayerName || 'Unknown'}
          </p>
        )}
        {item.type === 'game' && (item.participants?.length ?? 0) > 0 && (
          <div>
            <strong>Participants ({item.participants?.length ?? 0}):</strong>
            <ul className='list-disc list-inside mt-2 bg-gray-900/50 p-3 rounded-md'>
              {Array.isArray(item.participantNames) &&
                item.participantNames.length > 0 &&
                item.participantNames.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
            </ul>
            <p className='text-sm text-gray-500 mt-2'>
              Share per player: ${share}
            </p>
          </div>
        )}
      </div>
      <button
        onClick={onClose}
        className='w-full mt-6 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg'
      >
        Close
      </button>
    </Modal>
  );
};
export default HistoryDetailModal;
