import mongoose from 'mongoose';

const sentenceSchema = mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
    },
    sentenceOne: {
      type: String,
      required: true,
    },
    sentenceTwo: {
      type: String,
      required: true,
    },
    pictureUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Sentence = mongoose.model('Sentence', sentenceSchema);

export default Sentence;
