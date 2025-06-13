import Modal from '../Modal';

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  title: string;
  message: string;
};

const ConfirmationModal = ({
  isOpen,
  onClose,
  handleConfirm,
  title,
  message,
}: ConfirmationModalProps) => {
  // Modal implementation
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='sm'>
      <h2 className='text-xl font-bold mb-4 text-white'>{title}</h2>
      <p className='text-gray-300 mb-6'>{message}</p>
      <div className='flex justify-end gap-3'>
        <button
          onClick={onClose}
          className='bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg'
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleConfirm();
            onClose();
          }}
          className='bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg'
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};
export default ConfirmationModal;
