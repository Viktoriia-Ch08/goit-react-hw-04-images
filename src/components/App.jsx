import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonContainer } from './App.styled';
import { Button } from './Button/Button';
import { Circles } from 'react-loader-spinner';
import Modal from './Modal/Modal';
import { getImages } from 'services/image-gallery-api';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [chosenImage, setChosenImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);

  const handleSearchingValue = value => {
    setSearchValue(value);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    const fetchImages = async (searchValue, page) => {
      setIsLoading(true);

      const data = await getImages(searchValue, page);

      if (page === 1) {
        setImages([...data.hits]);
      } else {
        setImages(state => [...state, ...data.hits]);
      }

      setIsLoading(false);
      setTotalImages(data.total);

      return data;
    };

    fetchImages(searchValue, page).then(data => {
      if (data.total === 0) {
        showWarning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    });
  }, [searchValue, page]);

  const showWarning = title => {
    toast.warn(title, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const incrementPage = () => {
    setPage(state => state + 1);
  };

  const updateChosenImage = image => {
    setChosenImage(image);
  };

  const resetChosenImage = () => {
    setChosenImage(null);
  };

  return (
    <div>
      <Searchbar onSubmitHandler={handleSearchingValue} />
      <ImageGallery images={images} onImageClick={updateChosenImage} />
      {images.length !== 0 && (
        <ButtonContainer>
          <Button
            type="button"
            disabled={images.length >= totalImages}
            onClick={incrementPage}
          >
            Load More
          </Button>
        </ButtonContainer>
      )}
      {isLoading && (
        <Circles
          className="loader"
          height="80"
          width="80"
          color="rgba(190, 86, 250, 1)"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {chosenImage && (
        <Modal
          onClose={resetChosenImage}
          name={chosenImage.name}
          bigImg={chosenImage.bigImg}
        />
      )}
      <ToastContainer />
    </div>
  );
}
