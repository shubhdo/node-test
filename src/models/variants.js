import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Variant = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    name: {
      type: String,
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Variant', Variant);
