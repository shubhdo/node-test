import mongoose from 'mongoose';
import Address from './address';
const Schema = mongoose.Schema;

const Company = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: Address,
      default: Address,
    },
    description: String,
    subscription: {
      type: Schema.Types.ObjectId,
      ref: 'Subscription',
    },
    subscriptionLastDate: Date,
    subscriptionBilledAmount: {
      type: Number,
      required: true,
      select: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Company', Company);
