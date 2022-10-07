import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from '../Loader';
import './imageGallery.scss';

class ImageGallery extends Component {
  state = {
    photo: [],
    error: null,
    page: 1,
    currentLargeImageURL: '',
    searchTotal: null,
    status: 'idle',
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
    const prevName = prevProps.photoName;
    const nextName = this.props.photoName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ page: 1, photo: [] });
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=${nextPage}&key=29451917-11054f18e01d02c62ffb7517a&image_type=photo&orientation=horizontal&per_page=12`
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
            status: 'resolved',
            searchTotal: photo.total,
          }))
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { photo, status, currentLargeImageURL, searchTotal } = this.state;
    if (status === 'idle') {
      return;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected' || photo.length === 0) {
      return (
        <p className="error">No '{this.props.photoName}' image was found</p>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className="gallery">
            {photo.map(photo => (
              <ImageGalleryItem
                key={photo.id}
                photo={photo}
                onClick={this.onOpenModalWithLargeImage}
              />
            ))}
          </ul>
          {currentLargeImageURL && (
            <Modal closeModal={this.onModalClose} url={currentLargeImageURL} />
          )}
          {searchTotal > 12 && <Button onClick={this.hendlerMoreClick} />}
        </>
      );
    }
  }
}

export default ImageGallery;
