import { AppMode, User } from '@/types';

export type HeaderProps = {
  appMode: AppMode;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
};

const useHeader = (): HeaderProps => {
  const appMode: AppMode = 'local'; // This should be dynamically set based on your app's state
  const user: User | null = null; // Replace with actual user state from your app
  const onSignIn = () => {
    // Logic to handle sign-in
    console.log('Signing in...');
    // Redirect to sign-in page or open sign-in modal
  };
  const onSignOut = () => {
    // Logic to handle sign-out
    console.log('Signing out...');
    // Clear user session or redirect to sign-out page
  };
  return {
    appMode,
    user,
    onSignIn,
    onSignOut,
  };
};

export default useHeader;
