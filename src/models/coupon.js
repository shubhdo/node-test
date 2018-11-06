import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];

const Coupon = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    module: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceModule',
    },
    discount: {
      type: Number,
      required: true,
    },
    sentTo: [String],
    couponUrl: String,
    status: {
      type: String,
      enum: statusTypes,
      default: 'Active',
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Coupon', Coupon);
