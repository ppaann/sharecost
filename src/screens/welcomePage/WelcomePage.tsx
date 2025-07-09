import useWelcomePage from './useWelcomePage';

const WelcomePage = () => {
  const { onContinueLocal, onSignIn } = useWelcomePage();
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center p-8'>
      <h1 className='text-5xl font-bold mb-4'>Welcome to ShuttleShare!</h1>
      <p className='text-xl text-gray-400 mb-12 max-w-md'>
        The easiest way to track and share badminton game costs with your
        friends.
      </p>
      <div className='flex flex-col sm:flex-row gap-4'>
        <button
          onClick={onSignIn}
          className='w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105'
        >
          Sign In to Sync Data
        </button>
        <button
          onClick={onContinueLocal}
          className='w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105'
        >
          Continue Local Only
        </button>
      </div>
      <p className='text-sm text-gray-500 mt-8'>
        * You can always sign in later to back up your local data.
      </p>
    </div>
  );
};
export default WelcomePage;
