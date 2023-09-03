const { Schema, model } = require('mongoose');

const utilitySchema = new Schema(
  {
    name: String,
    flatNo: Number,
    ElectricityBill: Number,
    GasBill: Number,
    InternetBill: Number,
    ServiceCharge: Number,
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    author: {
      type: Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, id: true }
);

const Utility = model('Utility', utilitySchema);

module.exports = Utility;
