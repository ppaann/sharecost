'use client';
import { useState, useEffect, useMemo } from 'react';
import PlayerCardList from '@/componets/playerCardList/PlayerCardList';
import TabNavi from '@/componets/tabNavi/TabNavi/TabNavi';
import {
  AddPlayerModal,
  useAddPlayerModal,
  AddGameModal,
  useAddGameModal,
} from '@/componets/modals';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { fetchPlayers } from '@/lib/redux/playersSlice';
import { fetchHistory } from '@/lib/redux/historySlice';
import { BadmintonIcon } from '@/componets/icons';
import { Users, Plus } from 'lucide-react';
import { Player, PlayerWithBalance } from '@/types';
import { calculatePlayerBalances } from '@/lib/utils/calculatePlayerBalances';

export default function App() {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.entities);
  const history = useAppSelector((state) => state.history.entries);
  const playerLoading = useAppSelector((state) => state.players.loading);
  const userId = '123'; // Example user ID
  const [activeTab, setActiveTab] = useState<'players' | 'history'>('players');

  // --- Modals State ---
  // const [isAddPlayerModalOpen, setAddPlayerModalOpen] = useState(false);
  // const [isAddGameModalOpen, setAddGameModalOpen] = useState(false);
  // const [isHistoryDetailModalOpen, setHistoryDetailModalOpen] = useState(false);
  // const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryEntry | null>(null);
  // const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  // const [confirmModalProps, setConfirmModalProps] = useState({ onConfirm: () => {}, title: '', message: '' });

  const addPlayerModel = useAddPlayerModal();
  const addGameModal = useAddGameModal();

  // fetch initial data
  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchHistory());
  }, [dispatch]);

  const playerBalances = useMemo<PlayerWithBalance[]>(() => {
    return calculatePlayerBalances(players, history);
  }, [players, history]);

  if (playerLoading === 'pending') {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-900 text-white'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }
  if (playerLoading === 'failed') {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-900 text-white'>
        <div className='text-red-500'>
          Failed to load players. Please try again.
        </div>
      </div>
    );
  }
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
            <div>
              {players.length === 0 && playerLoading === 'succeeded' && (
                <div className='text-center py-16 text-gray-500'>
                  <Users className='mx-auto w-16 h-16 mb-4' />
                  <h3 className='text-xl'>No Players Yet</h3>
                  <p>
                    Click the &ldquo;Add Player&rdquo; button below to get
                    started!
                  </p>
                </div>
              )}

              <PlayerCardList playerBalances={playerBalances} />
            </div>
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
              <Users size={20} />
              <span className='hidden sm:inline'>Add Player</span>
            </button>
            <button
              onClick={() => addGameModal.onOpen()}
              className='bg-blue-600 hover:bg-blue-500 text-white font-bold p-4 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2'
            >
              <Plus size={20} />{' '}
              <span className='hidden sm:inline'>New Game</span>
            </button>
          </div>
        </div>
      </footer>
      {/* Modals */}
      <AddPlayerModal {...addPlayerModel} />
      <AddGameModal {...addGameModal} />
    </div>
  );
}
