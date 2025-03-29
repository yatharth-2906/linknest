const path = require('path');
require('dotenv').config({ path: './.env' });

const mongoose = require('mongoose');

const URL = process.env.DB_ONLINE_URL;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectToMongoDB() {
    try {
        await mongoose.connect(URL, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('Server connected to the Database.');
    } catch(err){
        console.log(err);
    }
}

module.exports = connectToMongoDB;