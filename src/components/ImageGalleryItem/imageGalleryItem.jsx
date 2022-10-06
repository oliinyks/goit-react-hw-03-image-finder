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
  photo: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
