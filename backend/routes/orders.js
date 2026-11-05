import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import Book from '../models/Book.js';
import Order from '../models/Order.js';

const router = Router();
router.use(requireAuth);

router.post('/', async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;
    const requiredAddress = ['fullName', 'phone', 'address', 'city', 'state', 'pinCode'];
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Your cart is empty.' });
    if (!shippingAddress || requiredAddress.some((key) => !String(shippingAddress[key] || '').trim())) {
      return res.status(400).json({ message: 'Please provide complete shipping details.' });
    }
    if (!/^\d{6}$/.test(String(shippingAddress.pinCode))) return res.status(400).json({ message: 'PIN code must contain 6 digits.' });

    const normalizedItems = [];
    for (const item of items) {
      const book = await Book.findOne({ bookId: item.bookId });
      const quantity = Number(item.quantity);
      if (!book) return res.status(400).json({ message: `Book not found: ${item.bookId}` });
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return res.status(400).json({ message: 'Each quantity must be between 1 and 20.' });
      }
      normalizedItems.push({ book: book._id, bookId: book.bookId, title: book.title, price: book.price, quantity });
    }
    const subtotal = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subtotal > 0 && subtotal < 499 ? 49 : 0;
    const order = await Order.create({
      orderNumber: `BK-${Date.now().toString().slice(-8)}-${Math.floor(100 + Math.random() * 900)}`,
      user: req.user._id,
      items: normalizedItems,
      subtotal,
      shippingFee,
      totalAmount: subtotal + shippingFee,
      shippingAddress
    });
    res.status(201).json({ message: 'Order placed successfully.', order });
  } catch (error) { next(error); }
});

router.get('/my-orders', async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).lean();
    res.json({ count: orders.length, orders });
  } catch (error) { next(error); }
});

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId, user: req.user._id }).lean();
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json({ order });
  } catch (error) { next(error); }
});

export default router;
