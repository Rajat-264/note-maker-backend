import Topic from '../models/Topic.js';

export const createTopic = async (req, res) => {
  try {
    const topic = await Topic.create({
      title: req.body.title,
      user: req.user.id,
      notes: [],
    });
    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json({ message: 'Error creating topic', error: err.message });
  }
};

export const getUserTopics = async (req, res) => {
  try {
    const topics = await Topic.find({ user: req.user.id });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching topics', error: err.message });
  }
};

export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findOne({ _id: req.params.id, user: req.user.id });
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching topic', error: err.message });
  }
};

export const addNoteToTopic = async (req, res) => {
  try {
    const topic = await Topic.findOne({ _id: req.params.id, user: req.user.id });
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    const newNote = {
      id: req.body.id,
      content: req.body.content,
    };

    topic.notes.push(newNote);
    await topic.save();
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: 'Error adding note', error: err.message });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const topic = await Topic.findOne({ _id: req.params.id, user: req.user.id });
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    topic.notes = req.body.notes; 
    await topic.save();
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: 'Error updating notes', error: err.message });
  }
};
