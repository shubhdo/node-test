import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Boys', 'Girls', 'Kids'],
    },
    material: String,
    assests: {
      images: [String],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    serviceModule: {
      name: String,
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'ServiceModule',
      },
    },
    category: {
      name: String,
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    },
    SubCategory: {
      name: String,
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    },
    dimensions: {
      width: String,
      height: String,
      length: String,
    },
    size: String,
    productionCountry: String,
    productRawData: {
      type: Schema.Types.Mixed,
    },
    color: String,
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', Product);
