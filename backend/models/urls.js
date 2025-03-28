const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  tree_id: {
    type: String,
    required: true
  },
  url_name: {
    type: String,
    required: true
  },
  url_path: {
    type: String,
    required: true
  }
});

const URLS = mongoose.model('URLS', urlSchema);

module.exports = URLS;