import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];

const Category = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: statusTypes,
      select: false,
      default: 'Active',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Category', Category);
