import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];

const rfp = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      name: String,
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
      },
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: false,
      select: false,
    },
    countryIsdCode: {
      type: String,
      select: false,
    },
    description: String,
    documents: [
      {
        name: String,
        src: String,
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    timeStart: {
      type: Date,
      default: Date.now(),
    },
    timeEnd: {
      type: Date,
    },
    status: {
      type: String,
      enum: statusTypes,
      default: 'Active',
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('RFP', rfp);
