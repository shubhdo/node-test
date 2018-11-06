import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];
const Subscription = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: statusTypes,
      default: 'Active',
      select: false,
    },
    price: {
      type: Number,
      required: true,
    },
    VAT: Number,
    AdditionalTaxes: [
      {
        name: String,
        percentage: Number,
      },
    ],
    duration: {
      type: String,
      enum: ['yearly', 'monthly'],
      default: 'monthly',
    },
    maxNumberOfMembers: {
      type: Number,
      default: 0,
    },
    features: [String],
    moduleIncluded: [
      {
        name: String,
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'ServiceModule',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Subscription', Subscription);
