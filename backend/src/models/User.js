import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    preferences: {
      travelStyle: { type: String, enum: ['budget', 'mid-range', 'luxury'], default: 'mid-range' },
      interests: [{ type: String }],
      preferredCurrency: { type: String, default: 'USD' },
      languages: { type: [String], default: ['en'] },
    },
    stats: {
      totalTrips: { type: Number, default: 0 },
      countriesVisited: [{ type: String }],
      totalSpent: { type: Number, default: 0 },
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', userSchema);
