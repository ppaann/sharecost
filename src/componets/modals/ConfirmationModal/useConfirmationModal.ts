import useModal from '../useModal';
import { useState, useRef, useCallback } from 'react';

type ConfirmationModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
};

const useConfirmationModal = () => {
  const modal = useModal<ConfirmationModalProps>();
  const confirmRef = useRef<() => void>(() => {});
  const [props, setProps] = useState<ConfirmationModalProps | null>(null);

  const open = useCallback(
    ({ title, message, onConfirm }: ConfirmationModalProps) => {
      confirmRef.current = onConfirm;
      setProps({ title, message, onConfirm });
      modal.onOpen();
    },
    [modal]
  );

  const close = () => {
    setProps(null);
    modal.onClose();
  };
  const handleConfirm = () => {
    confirmRef.current?.();
    close();
  };
  return {
    ...modal,
    open,
    close,
    handleConfirm,
    props,
  };
};

export default useConfirmationModal;
