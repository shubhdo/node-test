import mongoose from 'mongoose';
import shaEncrypt from 'sha256';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];

const permissionSchema = new Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isSubAdmin: {
    type: Boolean,
    default: false,
  },
});

const WishList = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: [{
    name: String,
    _id: {
      type: Schema.Types.Mixed,
      ref: 'Product',
    },
  }, ],
});

const User = new Schema({
  company: {
    type: Schema.Types.Mixed,
    ref: 'company',
    // required: true,
  },
  name: String,
  role: {
    type: String,
    enum: ['Buyer', 'Seller', 'Admin', 'SubAdmin'],
  },
  loginCount: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    sparse: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    // required: true,
  },
  password: {
    type: String,
    select: false,
    set: shaEncrypt,
  },
  permissions: {
    type: permissionSchema,
    default: permissionSchema,
  },
  wishlist: {
    type: WishList,
    select: false,
  },
  status: {
    type: String,
    enum: statusTypes,
    default: 'Inactive'
  },
  token: {
    type: String
  },
  speakeasy_secret: {
    type: Schema.Types.Mixed
  },
  otp: {
    type: String
  },
  provider: {
    type: String
  },
  linkedin: {
    type: Schema.Types.Mixed
  },
  TwoFactorEnabled: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
});

export default mongoose.model('User', User);