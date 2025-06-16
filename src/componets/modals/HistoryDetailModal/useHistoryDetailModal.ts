import useModal from '../useModal';
import { HistoryEntry } from '@/types';
import { useCallback, useState } from 'react';

type HistoryDetailModalProps = {
  item: HistoryEntry | null;
};

const useHistoryDetailModal = () => {
  const modal = useModal<HistoryDetailModalProps>();
  const [props, setProps] = useState<HistoryDetailModalProps>({ item: null });
  const open = useCallback(
    ({ item }: HistoryDetailModalProps) => {
      setProps({ item });
      modal.onOpen();
    },
    [modal]
  );
  return {
    ...modal,
    open,
    props,
  };
};

export default useHistoryDetailModal;
