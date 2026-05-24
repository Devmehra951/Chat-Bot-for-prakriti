import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri || !mongoUri.trim()) {
    throw new Error(
      'MONGODB_URI is missing. Create server/.env with a valid MongoDB Atlas URI and restart the server.'
    );
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
};
