const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
  email_id: {
    type: String,
    required: true
  },
  tree_id: {
    type: String,
    required: true
  },
  tree_name: {
    type: String,
    required: true
  },
  last_updated: {
    type: String,
    default: () => new Date().toDateString()
  }
});

const TREES = mongoose.model('TREES', treeSchema);

module.exports = TREES;