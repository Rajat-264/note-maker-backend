import express from 'express';
import {
  createTopic, getUserTopics, getTopicById, addNoteToTopic
} from '../controllers/topicController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/', createTopic);
router.get('/', getUserTopics);
router.get('/:id', getTopicById);
router.post('/:id/notes', addNoteToTopic);

export default router;
