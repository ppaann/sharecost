import { useAppDispatch } from '@/lib/redux/store';
import { onSelectOnboardingChoice } from '@/lib/redux/appModeSlice';

const useWelcomePage = () => {
  const dispatch = useAppDispatch();

  const onContinueLocal = () => {
    // Logic to continue offline
    console.log('Continuing local...');
    dispatch(onSelectOnboardingChoice('local'));
    // Navigate to the main app or home screen
  };
  const onSignIn = () => {
    // Logic to handle sign-in
    console.log('Signing in...');
    dispatch(onSelectOnboardingChoice('google'));
    // Redirect to sign-in page or open sign-in modal
  };
  return {
    onContinueLocal,
    onSignIn,
  };
};
export default useWelcomePage;
