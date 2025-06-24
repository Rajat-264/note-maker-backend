import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  title: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: [{
    id: String,
    content: String
  }],
}, { timestamps: true });

export default mongoose.model('Topic', topicSchema);
