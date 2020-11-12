import React from 'react';
import './ImageResults.css';

const ImageResults = ({ images }) => {
  return (
    <div>
      {images.map((img) => (
        <img className='img' src={img.largeImageURL} alt='' />
      ))}
    </div>
  );
};

export default ImageResults;
