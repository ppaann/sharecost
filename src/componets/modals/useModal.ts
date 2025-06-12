import { useState, useCallback } from 'react';

type UseModalReturn<TProps> = {
  isOpen: boolean;
  onOpen: (props?: TProps) => void;
  onClose: () => void;
  props: TProps | undefined;
};

const useModal = <TProps = void>(): UseModalReturn<TProps> => {
  const [isOpen, setIsOpen] = useState(false);
  const [props, setProps] = useState<TProps | undefined>(undefined);

  const onOpen = (newProps?: TProps) => {
    setIsOpen(true);
    setProps(newProps);
  };

  const onClose = useCallback(() => {
    setIsOpen(false);
    setProps(undefined);
  }, []);
  return { isOpen, onOpen, onClose, props };
};

export default useModal;
