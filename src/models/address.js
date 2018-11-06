import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Address = new Schema({
  line1: String,
  line2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String
});

// posts.createIndex( { location : "2dsphere" } )
export default mongoose.model('Address', Address);
