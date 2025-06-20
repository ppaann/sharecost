import { SyncIndicator } from '@/componets';
import { HeaderProps } from './useHeader';
import { LogOut } from 'lucide-react';

const Header = ({ appMode, user, onSignIn, onSignOut }: HeaderProps) => {
  return (
    <header className='bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20 p-4 border-b border-gray-700 shadow-lg flex justify-between items-center'>
      <div className='flex items-center gap-4'>
        <h1 className='text-2xl font-bold text-white'>ShuttleShare</h1>
        <div className='hidden sm:flex items-center gap-2 text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300'>
          <SyncIndicator appMode={appMode} />
        </div>
      </div>
      <div>
        {user ? (
          <div className='flex items-center gap-3'>
            <span className='hidden sm:inline text-sm font-medium'>
              {user.displayName}
            </span>
            <button
              onClick={onSignOut}
              className='bg-gray-700 p-2 rounded-full hover:bg-red-800/50 transition-colors'
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={onSignIn}
            className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg'
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
export default Header;
