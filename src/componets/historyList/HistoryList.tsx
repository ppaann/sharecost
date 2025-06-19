import { History, DollarSign } from 'lucide-react';
import { BadmintonIcon } from '@/componets/icons';
import { HistoryEntry } from '@/types';

const HistoryList = ({
  history,
  onSelect,
}: {
  history: HistoryEntry[];
  onSelect: (item: HistoryEntry) => void;
}) => {
  if (history.length === 0) {
    return (
      <div className='text-center py-16 text-gray-500'>
        <History className='mx-auto w-16 h-16 mb-4' />
        <h3 className='text-xl'>No History Yet</h3>
        <p>Record a game or settlement to see it here.</p>
      </div>
    );
  }
  return (
    <div className='space-y-3'>
      {history.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className='bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700/70 transition-colors'
        >
          <div className='flex items-center gap-4'>
            {item.type === 'game' ? (
              <BadmintonIcon className='text-blue-400' />
            ) : (
              <DollarSign className='text-green-400' />
            )}
            <div>
              <p className='font-bold text-white'>
                {item.type === 'game'
                  ? `Game - $${(item.cost || 0).toFixed(2)}`
                  : `Settlement - $${(item.amount || 0).toFixed(2)}`}
              </p>
              <p className='text-sm text-gray-400'>
                {new Date(item.date ?? '').toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className='text-right'>
            <p className='text-sm text-gray-300'>
              {item.type === 'game'
                ? `Paid by ${item.paidBy?.name}`
                : `Paid by ${item.settledPlayerName}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
