'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import usePlayerCard from './usePlayerCard';
import { PlayerWithBalance } from '@/types/player';

type PlayerCardProps = {
  player: PlayerWithBalance;
  onDelete: (id: string) => void;
  onSettle: (id: string) => void;
};

const PlayerCard = ({ player, onDelete, onSettle }: PlayerCardProps) => {
  const { balance, isOwed, isCreditor, balanceHighlight, balanceColor } =
    usePlayerCard({ player });

  return (
    <div
      className={`bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col justify-between transition-all duration-300 ${
        balanceHighlight ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-700/50'
      }`}
    >
      <div>
        <div className='flex justify-between items-start'>
          <h3 className='text-xl font-bold text-white mb-2'>{player.name}</h3>
          <button
            onClick={() => onDelete(player.id)}
            className='text-gray-500 hover:text-red-400 transition-colors'
          >
            <Trash2 size={18} />
          </button>
        </div>
        <div className='flex items-baseline gap-2 mt-2'>
          <span className={`text-3xl font-bold ${balanceColor}`}>
            ${Math.abs(balance).toFixed(2)}
          </span>
          <span className='text-sm text-gray-500'>
            {isOwed ? 'Owed' : isCreditor ? 'Credit' : 'Settled'}
          </span>
        </div>
        {balanceHighlight && (
          <div className='mt-3 text-xs text-red-400 bg-red-500/10 p-2 rounded-md'>
            Balance is over $50.
          </div>
        )}
      </div>
      {isOwed && (
        <button
          onClick={() => onSettle(player.id)}
          className='w-full mt-4 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors'
        >
          Mark as Paid
        </button>
      )}
    </div>
  );
};
export default PlayerCard;
