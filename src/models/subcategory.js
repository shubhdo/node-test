import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];
const SubCategory = new Schema(
  {
    Category: {
      name: String,
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    },
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

export default mongoose.model('SubCategory', SubCategory);
