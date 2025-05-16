import Topic from '../models/Topic.js';

export const createTopic = async (req, res) => {
  const topic = await Topic.create({ title: req.body.title, user: req.user.id, notes: [] });
  res.status(201).json(topic);
};

export const getUserTopics = async (req, res) => {
  const topics = await Topic.find({ user: req.user.id });
  res.json(topics);
};

export const getTopicById = async (req, res) => {
  const topic = await Topic.findOne({ _id: req.params.id, user: req.user.id });
  if (!topic) return res.status(404).json({ message: 'Topic not found' });
  res.json(topic);
};

export const addNoteToTopic = async (req, res) => {
  const topic = await Topic.findOne({ _id: req.params.id, user: req.user.id });
  if (!topic) return res.status(404).json({ message: 'Topic not found' });
  topic.notes.push(req.body.content);
  await topic.save();
  res.json(topic);
};
