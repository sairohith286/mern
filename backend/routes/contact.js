import { Router } from 'express';
import Contact from '../models/Contact.js';

const router = Router();
router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject = '', message } = req.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: 'Name, email and message are required.' });
    }
    const contact = await Contact.create({ name: name.trim(), email: email.trim().toLowerCase(), subject, message: message.trim() });
    res.status(201).json({ message: 'Your message has been received.', id: contact._id });
  } catch (error) { next(error); }
});
export default router;
