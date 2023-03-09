import PropTypes from 'prop-types';
import { useState, useEffect, useLayoutEffect } from 'react';
import { ImageGalleryList, ErrorInfo } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ButtonLoadMore } from '../ButtonLoadMore/ButtonLoadMore';
import { Loader } from '../Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import SearchService from '../../services/search-service';

const searchService = new SearchService();

const IMAGES_PER_PAGE = 12;

const Status = {
  IDLE: 'idle',
  LOADING: 'loading',
  IS_MORE: 'is_more',
  IS_END: 'is_end',
  ERROR: 'error'
}

export const ImageGallery = ({ searchQuery }) => {

  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchQuery) return;
    searchService.setNewQuery(searchQuery, IMAGES_PER_PAGE);
    performQuery();
  }, [searchQuery]);

  useLayoutEffect(() => {
    if(searchService.page > 1) {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [results]);

  const performQuery = async() => {
    try {
      setStatus(Status.LOADING);

      const data = await searchService.getNextData();

      if (!data || (data.length === 0)) {
        setResults([]);
        setError('Sorry, there are no images matching your search query. Please try again.');
        setStatus(Status.ERROR);
        return;
      }
        
      if (searchService.page === 1) {
        toast.success(`We found ${searchService.resultsQty} images.`);
      }

      setResults(prevResults => (searchService.page === 1) ? [...data] : [...prevResults, ...data]);
      setStatus(searchService.isLastPage() ? Status.IS_END : Status.IS_MORE);

    } catch (err) {
        setResults([]);
        setError(String(err));
        setStatus(Status.ERROR);
    }
  }
  
  const onLoadMore = () => {
    searchService.incrementPage();
    performQuery();
  };

  return (
    <>
      <ImageGalleryList>
        {results.map(item => (
          <ImageGalleryItem key={item.id} item={item} />
        ))}
      </ImageGalleryList>
      {status === Status.LOADING &&
        <Loader />
      }
      {status === Status.IS_MORE &&
        <ButtonLoadMore onClick={onLoadMore} />
      }
      {status === Status.ERROR &&
        <ErrorInfo>{error}</ErrorInfo>
      }
      <Toaster position="top-right"/>
    </>
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

