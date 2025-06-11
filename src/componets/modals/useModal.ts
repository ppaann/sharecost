import { useState, useCallback } from 'react';

type UseModalReturn<TProps> = {
  isOpen: boolean;
  open: (props?: TProps) => void;
  onClose: () => void;
  props: TProps | undefined;
};

const useModal = <TProps = void>(): UseModalReturn<TProps> => {
  const [isOpen, setIsOpen] = useState(false);
  const [props, setProps] = useState<TProps | undefined>(undefined);

  const open = (newProps?: TProps) => {
    setIsOpen(true);
    setProps(newProps);
  };

  const onClose = useCallback(() => {
    setIsOpen(false);
    setProps(undefined);
  }, []);
  return { isOpen, open, onClose, props };
};

export default useModal;
