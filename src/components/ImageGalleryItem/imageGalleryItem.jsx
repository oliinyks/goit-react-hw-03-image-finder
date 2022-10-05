import React from 'react';
import './imageGalleryItem.scss';

const ImageGalleryItem = ({url, alt, largeImageURL, onClick}) => (
<li className="galleryItem">
  <img className="galleryImg" src={url} alt={alt} onClick={() => onClick(largeImageURL)}/>
</li>
);
export default ImageGalleryItem;