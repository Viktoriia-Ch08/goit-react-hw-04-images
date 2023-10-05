import { useEffect } from 'react';
import { LargeImg, ModalWindow, Overlay } from './Modal.styled';

export default function Modal({ onClose, name, bigImg }) {
  document.body.style.overflow = 'hidden';

  useEffect(() => {
    const closeByEscape = event => {
      if (event.code === 'Escape') {
        document.body.style.overflow = 'scroll';
        onClose();
      }
    };
    window.addEventListener('keydown', closeByEscape);

    return () => {
      window.addEventListener('keydown', closeByEscape);
    };
  }, [onClose]);

  const onCloseModal = event => {
    if (event.target === event.currentTarget) {
      onClose();
      document.body.style.overflow = 'scroll';
    }
  };

  return (
    <Overlay onClick={onCloseModal} overflow="hidden">
      <ModalWindow>
        <LargeImg src={bigImg} alt={name} />
      </ModalWindow>
    </Overlay>
  );
}
