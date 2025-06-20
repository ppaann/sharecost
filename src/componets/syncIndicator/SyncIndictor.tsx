import { Cloud, CloudOff, RefreshCw, WifiOff } from 'lucide-react';
import { AppMode } from '@/types';

type SyncIndicatorProps = { appMode: AppMode };
const SyncIndicator = ({ appMode }: SyncIndicatorProps) => {
  switch (appMode) {
    case 'syncing':
      return (
        <>
          <RefreshCw className='w-4 h-4 animate-spin' /> Syncing...
        </>
      );
    case 'synced':
      return (
        <>
          <Cloud className='w-4 h-4 text-green-400' /> Synced
        </>
      );
    case 'offline':
      return (
        <>
          <WifiOff className='w-4 h-4 text-yellow-400' /> Offline
        </>
      );
    case 'local':
    default:
      return (
        <>
          <CloudOff className='w-4 h-4 text-gray-400' /> Local Data
        </>
      );
  }
};
export default SyncIndicator;
