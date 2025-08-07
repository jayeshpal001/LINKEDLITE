const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema =new  mongoose.Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    text: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
