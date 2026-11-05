import { Router } from 'express';
import Book from '../models/Book.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { category, featured, search } = req.query;
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (search) filter.$text = { $search: String(search) };
    const books = await Book.find(filter).sort({ title: 1 }).lean();
    res.json({ count: books.length, books });
  } catch (error) { next(error); }
});

router.get('/:bookId', async (req, res, next) => {
  try {
    const book = await Book.findOne({ bookId: req.params.bookId }).lean();
    if (!book) return res.status(404).json({ message: 'Book not found.' });
    res.json({ book });
  } catch (error) { next(error); }
});

export default router;
