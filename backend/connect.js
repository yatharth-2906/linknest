require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');

const mongodb_url = String(process.env.DB_URL);

async function connectToMongoDB() {
    try {
        await mongoose.connect(mongodb_url);
        console.log('Server connected to the Database.');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}

module.exports = connectToMongoDB;