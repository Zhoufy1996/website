import { useCallback, useState } from 'react';

const useModalState = (defaultValue: boolean) => {
  const [open, setOpen] = useState<boolean>(defaultValue);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    handleOpen,
    handleClose,
  };
};

export default useModalState;
