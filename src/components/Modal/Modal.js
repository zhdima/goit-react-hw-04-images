import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalContent, ModalButtonClose } from './Modal.styled';
import { BsXLg } from 'react-icons/bs';

export const Modal = ({ onClose, children }) => {
  
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown); 
  }, [onClose]);

  const handleOverlayClick = evt => {
    evt.stopPropagation();
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalButtonClose type="button" onClick={onClose}>
          <BsXLg size="12"/>
        </ModalButtonClose>

        {children}

      </ModalContent>
    </ModalOverlay>,
    document.getElementById('modal-root'));
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

