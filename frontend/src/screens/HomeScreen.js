import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageResults from '../components/ImageResults';

const HomeScreen = ({ match }) => {
  const searchWord = match.params.word;
  const [sentences, setSentences] = useState([]);
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loadingSentences, setLoadingSentences] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);

  // useEffect(() => {
  //   const fetchSentences = async () => {
  //     const { data } = await axios.get(`/trial2/world`);
  //     setSentences(data);
  //   };
  //   fetchSentences();
  // }, []);

  useEffect(() => {
    if (word === '') {
      setImages([]);
    }
  }, [word]);

  const fetchSentences = async (word) => {
    setLoadingSentences(true);
    const { data } = await axios.get(`/search/${word}`);
    setSentences(data);
    setLoadingSentences(false);
  };

  const fetchImages = async (word) => {
    setLoadingImages(true);
    await axios
      .get(
        `https://pixabay.com/api/?key=19089640-9c890233d900da2481ceb98a1&q=${word}&image_type=photo&per_page=8&safesearch=true`
      )
      .then((res) => setImages(res.data.hits))
      .catch((err) => console.log(err));

    setLoadingImages(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSentences(word);
    fetchImages(word);
  };
  return (
    <>
      <h1>Rendered</h1>
      <form id='search-form' onSubmit={handleSubmit} method='GET'>
        <label>
          Enter word:
          <input
            type='text'
            name='word'
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </label>
        <input type='submit' value='Submit' />
      </form>
      <h2>{loadingSentences && 'Loading Sentences...'}</h2>
      <h2>{loadingImages && 'Loading Image...'}</h2>
      {/* {sentences.map((sentence) => (
        <div key={sentence._id}>{sentence.word}</div>
      ))} */}
      <ul>
        {sentences.map((sentence, index) => (
          <li>{sentence}</li>
        ))}
      </ul>
      {images.length > 0 ? <ImageResults images={images} /> : null}
    </>
  );
};

export default HomeScreen;
