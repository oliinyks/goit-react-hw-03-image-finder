import React from 'react';
import PropTypes from 'prop-types';
import './imageGalleryItem.scss';

const ImageGalleryItem = ({
  photo: { webformatURL, tags, largeImageURL },
  onClick,
}) => (
  <li className="galleryItem">
    <img
      className="galleryImg"
      src={webformatURL}
      alt={tags}
      onClick={() => onClick(largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  photo: PropTypes.shape({
	webformatURL: PropTypes.string.isRequired,
	tags: PropTypes.string.isRequired,
	largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
