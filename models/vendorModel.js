const mongoose = require('mongoose');

const generalDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  generalVendorName: {
    type: String,
    required: true,
  },
  generalAadharCardId: {
    type: String,
    required: true,
  },
  generalPancardId: {
    type: String,
    required: true,
  },
  generalPrimaryNumber: {
    type: String,
    required: true,
  },
  generalSecondaryNumber: {
    type: String,
    required: true,
  },
  generalAddressProofId: {
    type: String,
    required: true,
  },
  generalEmail: {
    type: String,
    required: true,
  },
  generalDesignation: {
    type: String,
    required: true,
  },
  generalCountry: {
    type: String,
    required: true,
  },
  generalState: {
    type: String,
    required: true,
  },
  generalCity: {
    type: String,
    required: true,
  },
  generalPincode: {
    type: String,
    required: true,
  },

  // Company Details
  businessCompanyName: {
    type: String,
    required: true,
  },
  businessBusinessType: {
    type: String,
    required: true,
  },
  businessMcaId: {
    type: String,
    required: true,
  },
  businessMcaExpiryDate: {
    type: Date,
    required: true,
  },
  businessPrimaryNumber: {
    type: String,
    required: true,
  },
  businessSecondaryNumber: {
    type: String,
    required: true,
  },
  businessPrimaryEmail: {
    type: String,
    required: true,
  },
  businessSecondaryEmail: {
    type: String,
    required: true,
  },
  businessNda: {
    type: String,
    required: true,
  },
  businessNdaExpiryDate: {
    type: Date,
    required: true,
  },
  businessGstin: {
    type: String,
    required: true,
  },
  businessGstCertificateId: {
    type: String,
    required: true,
  },
  businessAadharCardId: {
    type: String,
    required: true,
  },
  businessPancardId: {
    type: String,
    required: true,
  },
  businessRegistrationAddress: {
    type: String,
    required: true,
  },
  businessCountry: {
    type: String,
    required: true,
  },
  businessState: {
    type: String,
    required: true,
  },
  businessCity: {
    type: String,
    required: true,
  },
  businessPincode: {
    type: String,
    required: true,
  },
  businessAddressProofId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const bankDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bankName: {
    type: String,
    required: true,
  },
  bankAccountNumber: {
    type: String,
    required: true,
  },
  bankBranch: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  passbookId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
  },
  pancardNumber: {
    type: String,
    required: true,
  },
  pancardId: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const VendorBankDetails = mongoose.model('VedorBankDetails', bankDetailsSchema);
const VendorGeneralDetails = mongoose.model('VendorGeneralDetails', generalDetailsSchema);

module.exports = {VendorGeneralDetails, VendorBankDetails};
