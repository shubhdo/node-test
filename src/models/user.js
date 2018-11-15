import mongoose from 'mongoose';
import shaEncrypt from 'sha256';
const Schema = mongoose.Schema;

const statusTypes = ['Active', 'Inactive'];

const Address = new Schema({
  line1: String,
  line2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String
});


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
  firstName: String,
  lastName: String,
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
  address: [{
    type: Address,
    default: Address
  }],
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
  social_login_provider_id: {
    type: String
  },
  social_login_provider: {
    type: String
  },
  TwoFactorEnabled: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
});

export default mongoose.model('User', User);