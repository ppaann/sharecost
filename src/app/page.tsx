'use client';
import { useState, useEffect, useMemo } from 'react';
import PlayerCardList from '@/componets/playerCardList/PlayerCardList';
import HistoryList from '@/componets/historyList/HistoryList';
import TabNavi from '@/componets/tabNavi/TabNavi/TabNavi';
import {
  AddPlayerModal,
  useAddPlayerModal,
  AddGameModal,
  useAddGameModal,
  useConfirmationModal,
  ConfirmationModal,
  HistoryDetailModal,
  useHistoryDetailModal,
} from '@/componets/modals';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { fetchPlayers } from '@/lib/redux/playersSlice';
import { fetchHistory } from '@/lib/redux/historySlice';
import { BadmintonIcon } from '@/componets/icons';
import { Users, Plus } from 'lucide-react';
import { HistoryEntry, PlayerWithBalance } from '@/types';
import { calculatePlayerBalances } from '@/lib/utils/calculatePlayerBalances';
import { useSettleBalance } from '@/hooks';

export default function App() {
  const dispatch = useAppDispatch();

  const players = useAppSelector((state) => state.players.entities);
  const history = useAppSelector((state) => state.history.entries);
  const playerLoading = useAppSelector((state) => state.players.loading);

  const me = useMemo(() => players.find((p) => p.isMe), [players]);
  const friends = useMemo(() => players.filter((p) => !p.isMe), [players]);

  const [activeTab, setActiveTab] = useState<'players' | 'history'>('players');

  // --- Modals State ---

  const addPlayerModel = useAddPlayerModal();
  const addGameModal = useAddGameModal();
  const confirmSettleModal = useConfirmationModal();
  const historyDetailModal = useHistoryDetailModal();

  const settleBalance = useSettleBalance();

  // fetch initial data
  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchHistory());
  }, [dispatch]);

  const friendBalances = useMemo<PlayerWithBalance[]>(() => {
    if (!me) return [];

    return calculatePlayerBalances(friends, history, me);
  }, [friends, history, me]);

  const { whoOwesMe, iOwe, myTotalBalance } = useMemo(() => {
    const whoOwesMe = friendBalances.filter((f) => f.balance < -0.01); // Use threshold for float issues
    const iOwe = friendBalances.filter((f) => f.balance > 0.01);
    const myTotalBalance = friendBalances.reduce(
      (sum, f) => sum - f.balance,
      0
    );
    return { whoOwesMe, iOwe, myTotalBalance };
  }, [friendBalances]);

  const handleSettleBalance = (playerId: string) => {
    confirmSettleModal.open({
      title: 'Settle Balance',
      message: `Are you sure you want to settle the balance ?`,
      onConfirm: () => {
        settleBalance(friendBalances, playerId);
        confirmSettleModal.close();
      },
    });
  };

  const handleHistoryItemClick = (item: HistoryEntry) => {
    historyDetailModal.open({ item });
  };

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
        {me && (
          <div className='text-right pr-4'>
            <div className='font-bold text-white'>{me.name}</div>
            <div className='text-xs text-gray-400'>(Me)</div>
          </div>
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
              {/* My Summary Card */}
              <div className='bg-gray-800 p-6 rounded-xl shadow-lg'>
                <h2 className='text-lg font-semibold text-gray-400 mb-2'>
                  My Summary
                </h2>
                <div className='flex items-baseline gap-2'>
                  <span
                    className={`text-4xl font-bold ${
                      myTotalBalance > 0
                        ? 'text-green-400'
                        : myTotalBalance < 0
                        ? 'text-red-400'
                        : 'text-white'
                    }`}
                  >
                    ${Math.abs(myTotalBalance).toFixed(2)}
                  </span>
                  <span className='text-gray-400'>
                    {myTotalBalance > 0
                      ? 'Owed to Me'
                      : myTotalBalance < 0
                      ? 'You Owe'
                      : 'All Settled'}
                  </span>
                </div>
              </div>
              {/* Lists of Debts */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-xl font-bold mb-4'>Who Owes Me</h3>
                  <div className='space-y-3'>
                    <PlayerCardList playerBalances={whoOwesMe} />
                    {whoOwesMe.length === 0 && (
                      <p className='text-gray-500 text-sm'>
                        No one owes you money.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className='text-xl font-bold mb-4'>Who I Owe</h3>
                  <div className='space-y-3'>
                    <PlayerCardList
                      playerBalances={iOwe}
                      onRequestSettle={handleSettleBalance}
                    />
                    {iOwe.length === 0 && (
                      <p className='text-gray-500 text-sm'>
                        You don&rdquo;t owe anyone money.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <HistoryList history={history} onSelect={handleHistoryItemClick} />
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
              <Plus size={20} />
              <span className='hidden sm:inline'>New Game</span>
            </button>
          </div>
        </div>
      </footer>
      {/* Modals */}
      <AddPlayerModal {...addPlayerModel} />
      <AddGameModal {...addGameModal} />
      <ConfirmationModal
        isOpen={confirmSettleModal.isOpen}
        onClose={confirmSettleModal.close}
        handleConfirm={confirmSettleModal.handleConfirm || (() => {})}
        title={confirmSettleModal.props?.title || ''}
        message={confirmSettleModal.props?.message || ''}
      />
      <HistoryDetailModal
        isOpen={historyDetailModal.isOpen}
        onClose={historyDetailModal.onClose}
        item={historyDetailModal.props?.item || null}
      />
    </div>
  );
}
