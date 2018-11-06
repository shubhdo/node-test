import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const History = new Schema({
  visitedUrls: [
    {
      url: String,
      visitedTime: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  searchKeywords: [
    {
      name: String,
      pageUrl: String,
      visitedTime: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  viewedProducts: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      visitedTime: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('History', History);
