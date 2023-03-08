import PropTypes from 'prop-types';
import { useState } from 'react';
import { ListItem, GalleryImage, ModalImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({ item: { webformatURL, largeImageURL, tags } }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(prevModalOpen => !prevModalOpen);

  return (
    <ListItem onClick={toggleModal}>
      <GalleryImage src={webformatURL} alt={tags} />
      {isModalOpen && 
        <Modal onClose={toggleModal}>
          <ModalImage src={largeImageURL} alt={tags} />
        </Modal>
      }
    </ListItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }).isRequired,
};

