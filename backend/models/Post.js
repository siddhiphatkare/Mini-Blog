const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isEdited: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  history: [
    {
      title: String,
      content: String,
      editedAt: Date,
      editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

// Automatically update `updatedAt` on save
postSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Post', postSchema);
