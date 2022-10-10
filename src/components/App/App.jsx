import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from '../Loader';
import './App.scss';

class App extends React.Component {
  state = {
    photoName: '',
    photo: [],
    error: null,
    page: 1,
    currentLargeImageURL: '',
    searchTotal: null,
    loader: false,
  };

  handlerFormSubmit = photoName => {
    this.setState({ photoName, page: 1 });
  };

  onOpenModalWithLargeImage = url => {
    this.setState({
      currentLargeImageURL: url,
    });
  };

  onModalClose = () => {
    this.setState({
      currentLargeImageURL: '',
    });
  };

  hendlerMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.photoName;
    const prevPage = prevState.page;
    const { photoName, page } = this.state;

    if (photoName !== prevName) {
      this.setState({photo: [] });
    }
    if (prevName !== photoName || prevPage !== page) {
      this.setState({ loader: true });
      fetch(
        `https://pixabay.com/api/?q=${photoName}&page=${page}&key=29451917-11054f18e01d02c62ffb7517a&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error());
        })
        .then(photo =>
          this.setState(prevState => ({
            photo: [...prevState.photo, ...photo.hits],
            searchTotal: photo.total,
          }))
        )
        .catch(error => this.setState({ error }))
        .finally(this.setState({ loader: false }));
    }
  }

  render() {
    const {
      photoName,
      page,
      loader,
      photo,
      currentLargeImageURL,
      searchTotal,
    } = this.state;
    return (
      <section className="section">
        <h1 className="headerTitle">
          Photo <span>Gallery</span>
        </h1>
        <Searchbar onSubmit={this.handlerFormSubmit} page={page} />

        {searchTotal === 0 ? (
          <p className="error">No "{photoName}" image was found</p>
        ) : (
          <ImageGallery
            photoName={photo}
            onClick={this.onOpenModalWithLargeImage}
          />
        )}

        {loader && <Loader />}
        {currentLargeImageURL && (
          <Modal closeModal={this.onModalClose} url={currentLargeImageURL} />
        )}
        {searchTotal > 12 && <Button onClick={this.hendlerMoreClick} />}
        <ToastContainer theme="dark" autoClose={3000} />
      </section>
    );
  }
}
export default App;
