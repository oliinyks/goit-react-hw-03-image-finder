import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from '../Loader';
import './imageGallery.scss';

class ImageGallery extends Component {
  state = {
    photo: null,
    error: null,
    page: 1,
	 currentLargeImageURL: '',
    status: 'idle',
  };

  onOpenModalWithLargeImage = (url) => {
	this.setState({
	  currentLargeImageURL: url,
	})
 }

 onModalClose = () => {
	this.setState({
	  currentLargeImageURL: "",
	})
 }

  hendlerMoreClick = page => {
    this.setState({ page });
  };

  componentDidUpdate(prevProps) {
    const prevName = prevProps.photoName;
    const nextName = this.props.photoName;
   //  const prevPage = prevProps.page;
    const nextPage = this.state.page;
   //  console.log("🚀 ~ file: imageGallery.jsx ~ line 23 ~ ImageGallery ~ componentDidUpdate ~ prevPage", prevPage)
   //  console.log("🚀 ~ file: imageGallery.jsx ~ line 25 ~ ImageGallery ~ componentDidUpdate ~ nextPage", nextPage)
	// if (prevName !== nextName || prevPage !== nextPage) {
	// if (prevName !== nextName || nextPage > 1) {
		// || prevPage < nextPage

    if (prevName !== nextName) {
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
        .then(photo => this.setState({ photo, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { photo, status, currentLargeImageURL } = this.state;
    if (status === 'idle') {
      return;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected' || photo.total === 0) {
      return (
        <p className="error">No '{this.props.photoName}' image was found</p>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className="gallery">
            {photo.hits.map(photo => (
            <ImageGalleryItem key={photo.id} photo={photo} onClick={this.onOpenModalWithLargeImage}/>
				))}
          </ul>
			 {currentLargeImageURL && (<Modal closeModal={this.onModalClose} url={currentLargeImageURL}/>)}
          <Button onClick={this.hendlerMoreClick} />
        </>
      );
    }
  }
}

export default ImageGallery;
