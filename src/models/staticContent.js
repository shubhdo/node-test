import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Content = new Schema({
  termsAndConditions: {
    type: String,
    default: `Entire Agreement
        These Terms constitute the entire agreement between Company
        Name and you in relation to your use of this Website, and 
        supersede all prior agreements and understandings.
        Governing Law & Jurisdiction
        These Terms will be governed by and interpreted in 
        accordance with the laws of the State of Country, and you 
        submit to the non-exclusive jurisdiction of the state and 
        federal courts located in Country for the resolution of any disputes.`
  },
  aboutUs: {
    title: String,
    summary: String,
    description: {
      type: String,
      default: `Entire Agreement
      These Terms constitute the entire agreement between Company
      Name and you in relation to your use of this Website, and 
      supersede all prior agreements and understandings.
      Governing Law & Jurisdiction
      These Terms will be governed by and interpreted in 
      accordance with the laws of the State of Country, and you 
      submit to the non-exclusive jurisdiction of the state and 
      federal courts located in Country for the resolution of any disputes.`
    },
    images: [String]
  },
  contactUs: {
    title: String,
    phone: [String],
    email: [String],
    description: {
      type: String,
      default: `Entire Agreement
      These Terms constitute the entire agreement between Company
      Name and you in relation to your use of this Website, and 
      supersede all prior agreements and understandings.
      Governing Law & Jurisdiction
      These Terms will be governed by and interpreted in 
      accordance with the laws of the State of Country, and you 
      submit to the non-exclusive jurisdiction of the state and 
      federal courts located in Country for the resolution of any disputes.`
    },
    images: [String],
    address: String
  }
});

export default mongoose.model('Content', Content);
