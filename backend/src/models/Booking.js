import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itinerary: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' },
    type: {
      type: String,
      required: true,
      enum: ['flight', 'hotel', 'activity', 'transport', 'other'],
    },
    title: { type: String, required: true },
    provider: { type: String },
    confirmationNumber: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    location: {
      city: { type: String },
      country: { type: String },
      address: { type: String },
    },
    cost: {
      amount: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
      isPaid: { type: Boolean, default: false },
    },
    documents: [{ name: String, url: String }],
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
