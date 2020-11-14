import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageResults from '../components/ImageResults';
import TableResults from '../components/TableResults';
import { BasicTable } from '../components/BasicTable';

const HomeScreen = ({ match }) => {
  const searchWord = match.params.word;
  const sentence = [];
  const [sentences, setSentences] = useState([]);
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loadingSentences, setLoadingSentences] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [myArray, setMyArray] = useState([]);
  const [table, setTable] = useState([]);

  // useEffect(() => {
  //   setSentences(localStorage.getItem('document'));
  // }, []);

  // If the input box is empty, don't show any images.
  useEffect(() => {
    if (word === '') {
      setImages([]);
    }
  }, [word]);

  // Get the sentences according to input
  const fetchSentences = async (word) => {
    setLoadingSentences(true);
    const { data } = await axios.get(`/search/${word}`);
    console.log(data[0].englishSentence);
    console.log(data[0].germanSentence);
    setSentences(data);
    setLoadingSentences(false);
  };

  // Get the images according to input
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

  const addToTable = (e) => {
    e.preventDefault();
    // setTable(sentences);
    localStorage.setItem('document', JSON.stringify(sentences));
    console.log('Add To Table');
  };

  const getData = (e) => {
    e.preventDefault();
    console.log(localStorage.getItem('document'));
  };

  return (
    <>
      <h1>Language Scraper</h1>
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

      {/* Show if it's loading sentences or images */}
      <h2>{loadingSentences && 'Loading Sentences...'}</h2>
      <h2>{loadingImages && 'Loading Images...'}</h2>

      {/* {sentences.map((sentence) => (
        <div key={sentence._id}>{sentence.word}</div>
      ))} */}

      {/* Show sentences in a list */}
      <ul>
        {sentences.map((sentence, index) => (
          <li key={sentence}>{sentence}</li>
        ))}
      </ul>
      <button onClick={addToTable}>Add To Table</button>
      <button onClick={getData}>Get Data</button>

      {/* Render image results if it exists. */}
      {/* {images.length > 0 ? <ImageResults images={images} /> : null} */}

      {/* <TableResults sentences={table} /> */}
      <BasicTable />
    </>
  );
};

export default HomeScreen;
