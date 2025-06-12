'use client';
import { useState, useEffect } from 'react';
import PlayerCardList from '@/componets/playerCardList/PlayerCardList';
import TabNavi from '@/componets/tabNavi/TabNavi/TabNavi';
import { AddPlayerModal, useAddPlayerModal } from '@/componets/modals';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { addPlayer, fetchPlayers } from '@/lib/redux/playersSlice';

import { Users } from 'lucide-react';

// --- Custom SVG Icon for Badminton ---
const BadmintonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M14.5 18.5L6 10l4.5-4.5 8.5 8.5-4.5 4.5z' />
    <path d='M12 5l-5 5' />
    <path d='M15 8l7 7' />
    <path d='M8 13l-1.5 1.5' />
    <path d='M14 19l-4-4' />
  </svg>
);

export default function App() {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.entities);
  const userId = '123'; // Example user ID
  // const [userId, setUserId] = useState<string | null>('sdf');
  // const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'players' | 'history'>('players');

  // --- Modals State ---
  // const [isAddPlayerModalOpen, setAddPlayerModalOpen] = useState(false);
  // const [isAddGameModalOpen, setAddGameModalOpen] = useState(false);
  // const [isHistoryDetailModalOpen, setHistoryDetailModalOpen] = useState(false);
  // const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryEntry | null>(null);
  // const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  // const [confirmModalProps, setConfirmModalProps] = useState({ onConfirm: () => {}, title: '', message: '' });

  const addPlayerModel = useAddPlayerModal();

  const playerBalances = [
    // Example player data
    { id: '1', name: 'Alice', balance: 10 },
    { id: '2', name: 'Bob', balance: -5 },
    { id: '3', name: 'Charlie', balance: 0 },
  ];

  // fetch initial data
  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  return (
    <div className='bg-gray-900 text-white min-h-screen font-sans flex flex-col'>
      <header className='bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20 p-4 border-b border-gray-700 shadow-lg flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <BadmintonIcon className='text-blue-400 w-8 h-8' />
          <h1 className='text-2xl font-bold text-white'>ShuttleShare</h1>
        </div>
        {userId && (
          <span className='text-xs text-gray-500 font-mono hidden md:block'>
            UserID: {userId}
          </span>
        )}
      </header>

      <main className='flex-grow p-4 md:p-6'>
        {/* {error && (
          <div className='bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4'>
            {error}
          </div>
        )} */}

        <div className='w-full max-w-4xl mx-auto'>
          {activeTab === 'players' && (
            <>
              <div>
                {players && players.length > 0 ? (
                  players.map((p) => <div key={p.id}>{p.name}</div>)
                ) : (
                  <div>No Player</div>
                )}
              </div>
              <PlayerCardList playerBalances={playerBalances} />
            </>
          )}
          {activeTab === 'history' && (
            <div>historyList</div>
            // <HistoryList history={history} onSelect={openHistoryDetail} />
          )}
        </div>
      </main>

      <footer className='sticky bottom-0 bg-gray-900/80 backdrop-blur-sm p-4 mt-auto'>
        <div className='w-full max-w-4xl mx-auto flex justify-center items-center gap-4'>
          <TabNavi activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className='flex items-center gap-2'>
            <button
              onClick={() => addPlayerModel.onOpen()}
              className='bg-indigo-600 hover:bg-indigo-500 text-white font-bold p-4 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2'
            >
              <Users size={20} />{' '}
              <span className='hidden sm:inline'>Add Player</span>
            </button>
            {/*  <button
              onClick={() => {
                setPayerId('');
                setParticipantIds([]);
                setError('');
                setAddGameModalOpen(true);
              }}
              className='bg-blue-600 hover:bg-blue-500 text-white font-bold p-4 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2'
            >
              <Plus size={20} />{' '}
              <span className='hidden sm:inline'>New Game</span>
            </button> */}
          </div>
        </div>
      </footer>
      {/* Modals */}
      <AddPlayerModal {...addPlayerModel} />
    </div>
  );
}
