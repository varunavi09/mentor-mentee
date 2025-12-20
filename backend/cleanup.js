// Cleanup script to reset the database (optional - for testing purposes)
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mentor_connect';

async function cleanup() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get all collections
    const collections = await mongoose.connection.db.collections();

    console.log('🗑️ Cleaning up database...');
    for (let collection of collections) {
      await collection.deleteMany({});
      console.log(`  Cleared collection: ${collection.collectionName}`);
    }

    console.log('✅ Database cleanup completed!');
    await mongoose.connection.close();
    console.log('👋 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
  process.exit(0);
}

cleanup();
