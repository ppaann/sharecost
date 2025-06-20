const useWelcomePage = () => {
  const onContinueOffline = () => {
    // Logic to continue offline
    console.log('Continuing offline...');
    // Navigate to the main app or home screen
  };
  const onSignIn = () => {
    // Logic to handle sign-in
    console.log('Signing in...');
    // Redirect to sign-in page or open sign-in modal
  };
  return {
    onContinueOffline,
    onSignIn,
  };
};
export default useWelcomePage;
