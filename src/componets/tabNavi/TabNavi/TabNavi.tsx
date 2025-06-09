'use client';
import React from 'react';
import TabButton from '../TabButton/TabButton';
import { Users, History } from 'lucide-react';

const TabNavi = () => {
  const [activeTab, setActiveTab] = React.useState<'players' | 'history'>(
    'players'
  );
  return (
    <nav className='flex-grow flex justify-center items-center bg-gray-800/50 rounded-full shadow-lg p-1'>
      <TabButton
        icon={Users}
        label='Players'
        isActive={activeTab === 'players'}
        onClick={() => setActiveTab('players')}
      />
      <TabButton
        icon={History}
        label='History'
        isActive={activeTab === 'history'}
        onClick={() => setActiveTab('history')}
      />
    </nav>
  );
};
export default TabNavi;
