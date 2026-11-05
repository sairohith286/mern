import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['self-help', 'philosophy', 'fiction'] },
  categoryLabel: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  pages: { type: Number, default: 0 },
  year: { type: Number, default: null },
  featured: { type: Boolean, default: false },
  isbn: { type: String, default: '' }
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text', description: 'text' });
export default mongoose.model('Book', bookSchema);
