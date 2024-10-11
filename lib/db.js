import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        // Add logging for connection attempt
        console.log('Attempting to connect to MongoDB...');

        cached.promise = mongoose.connect(MONGO_URI, opts)
            .then((mongoose) => {
                console.log('DB connected'); // Log successful connection
                return mongoose;
            })
            .catch((error) => {
                console.error('MongoDB connection error:', error); // Log any connection errors
                throw new Error('Failed to connect to MongoDB');
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // Reset the promise on error
        console.error('Error while connecting to MongoDB:', e); // Log the error
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
