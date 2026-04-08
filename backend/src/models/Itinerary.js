import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  time: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  category: {
    type: String,
    enum: ['transport', 'accommodation', 'food', 'activity', 'other'],
    default: 'activity',
  },
  estimatedCost: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  notes: { type: String },
});

const dayPlanSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  date: { type: Date },
  location: { type: String },
  activities: [activitySchema],
  dailyBudget: { type: Number, default: 0 },
});

const itinerarySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalBudget: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['draft', 'planned', 'ongoing', 'completed', 'cancelled'],
      default: 'draft',
    },
    isAiGenerated: { type: Boolean, default: false },
    aiPrompt: { type: String },
    days: [dayPlanSchema],
    tags: [{ type: String }],
    coverImage: { type: String },
    notes: { type: String },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default mongoose.model('Itinerary', itinerarySchema);
