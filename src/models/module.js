import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ServiceModule = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        name: String,
        src: String,
      },
    ],
    categories: [
      {
        name: String,
        _id: Schema.Types.ObjectId,
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('ServiceModule', ServiceModule);
