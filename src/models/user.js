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

const SocialLoginSchema = new Schema({
  facebook: {
    id: {
      type: String
    }
  },
  linkedin: {
    id: {
      type: String
    }
  },
  twitter: {
    id: {
      type: String
    }
  }
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
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    // required: true,
  },
  password: {
    type: String,
    required: true,
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
  TwoFactorEnabled: {
    type: Boolean,
    default: false
  },
  socialLoginSchema: {
    type: SocialLoginSchema,
    default: SocialLoginSchema
  }

}, {
  timestamps: true,
});

export default mongoose.model('User', User);