import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeScreen = ({ match }) => {
  const searchWord = match.params.word;
  const [sentences, setSentences] = useState([]);
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchSentences = async () => {
  //     const { data } = await axios.get(`/trial2/world`);
  //     setSentences(data);
  //   };
  //   fetchSentences();
  // }, []);

  const fetchSentences = async (word) => {
    setLoading(true);
    const { data } = await axios.get(`/trial2/${word}`);
    setSentences(data);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSentences(word);
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
      <h2>{loading && 'loading'}</h2>
      {/* {sentences.map((sentence) => (
        <div key={sentence._id}>{sentence.word}</div>
      ))} */}
      <ul>
        {sentences.map((sentence, index) => (
          <li>{sentence}</li>
        ))}
      </ul>
    </>
  );
};

export default HomeScreen;
