import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeScreen = () => {
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    const fetchSentences = async () => {
      const { data } = await axios.get('/api/sentences');
      setSentences(data);
    };
    fetchSentences();
  }, [sentences]);

  return (
    <>
      {sentences.map((sentence) => (
        <div key={sentence._id}>{sentence.word}</div>
      ))}
    </>
  );
};

export default HomeScreen;
