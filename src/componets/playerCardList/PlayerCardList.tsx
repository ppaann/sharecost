'use client';
import React from 'react';
import PlayerCard from '@/componets/playerCard/PlayerCard';
import { Users } from 'lucide-react';

type PlayerBalances = {
  id: string;
  name: string;
  balance: number;
}[];

const PlayerCardList = ({
  playerBalances,
  onRequestSettle,
}: {
  playerBalances: PlayerBalances;
  onRequestSettle: (playerId: string) => void;
}) => {
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {playerBalances
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onSettle={onRequestSettle}
              onDelete={() => {}}
            />
          ))}
      </div>
      {playerBalances.length === 0 && (
        <div className='text-center py-16 text-gray-500'>
          <Users className='mx-auto w-16 h-16 mb-4' />
          <h3 className='text-xl'>No Players Yet</h3>
          <p>Click the &ldquo;Add Player&rdquo; button below to get started!</p>
        </div>
      )}
    </div>
  );
};

export default PlayerCardList;
