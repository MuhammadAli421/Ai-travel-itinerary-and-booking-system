import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../src/models/User.js';

const email = process.argv[2];

if (!email) {
  console.error('Usage: node scripts/makeAdmin.js <email>');
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);

const user = await User.findOneAndUpdate(
  { email },
  { $set: { role: 'admin' } },
  { new: true }
);

if (!user) {
  console.error(`No user found with email: ${email}`);
} else {
  console.log(`Success! ${user.name} (${user.email}) is now an admin.`);
}

await mongoose.disconnect();
