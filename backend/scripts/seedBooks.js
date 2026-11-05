import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Book from '../models/Book.js';

const books = [
  { bookId:'atomic-habits', title:'Atomic Habits', author:'James Clear', category:'self-help', categoryLabel:'Self-Help', price:499, originalPrice:699, description:'An easy & proven way to build good habits & break bad ones through tiny, incremental daily transformations.', coverImage:'/src/assets/images/book_atomic_habits_1793530486167.jpg', rating:4.8, pages:320, year:2018, featured:true, isbn:'978-0735211292' },
  { bookId:'psychology-of-money', title:'The Psychology of Money', author:'Morgan Housel', category:'self-help', categoryLabel:'Self-Help', price:399, originalPrice:499, description:'Timeless lessons on wealth, greed, and happiness exploring how people think about money and behavioral finance.', coverImage:'/src/assets/images/book_psychology_money_1793530488565.jpg', rating:4.7, pages:256, year:2020, featured:true, isbn:'978-9390166268' },
  { bookId:'deep-work', title:'Deep Work', author:'Cal Newport', category:'self-help', categoryLabel:'Self-Help', price:449, originalPrice:599, description:'Rules for focused success in a distracted world, teaching how to cultivate deep concentration in a hyper-connected age.', coverImage:'/src/assets/images/book_deep_work_1793530486963.jpg', rating:4.6, pages:304, year:2016, featured:false, isbn:'978-1455586691' },
  { bookId:'meditations', title:'Meditations', author:'Marcus Aurelius', category:'philosophy', categoryLabel:'Philosophy', price:349, originalPrice:450, description:'Private reflections and enduring Stoic wisdom from the Roman Emperor on resilience, virtue, and tranquility.', coverImage:'/src/assets/images/book_meditations_1793530488756.jpg', rating:4.9, pages:254, year:180, featured:true, isbn:'978-0140449334' },
  { bookId:'the-republic', title:'The Republic', author:'Plato', category:'philosophy', categoryLabel:'Philosophy', price:389, originalPrice:499, description:'The foundational cornerstone of Western political philosophy examining justice, the ideal city-state, and the Allegory of the Cave.', coverImage:'/src/assets/images/book_the_republic_1793530488726.jpg', rating:4.5, pages:416, year:-375, featured:false, isbn:'978-0140455113' },
  { bookId:'the-stranger', title:'The Stranger', author:'Albert Camus', category:'philosophy', categoryLabel:'Philosophy', price:299, originalPrice:399, description:'A masterpiece of Absurdist literature chronicling Meursault, a man emotionally detached from societal expectations in Algiers.', coverImage:'/src/assets/images/book_the_stranger_1793530489534.jpg', rating:4.6, pages:160, year:1942, featured:true, isbn:'978-0679720201' },
  { bookId:'the-alchemist', title:'The Alchemist', author:'Paulo Coelho', category:'fiction', categoryLabel:'Fiction', price:329, originalPrice:420, description:'A lyrical fable about following your dream and listening to your heart through Santiago’s journey to the Egyptian pyramids.', coverImage:'/src/assets/images/book_the_alchemist_1793530490739.jpg', rating:4.8, pages:208, year:1988, featured:true, isbn:'978-0062315007' },
  { bookId:'1984', title:'1984', author:'George Orwell', category:'fiction', categoryLabel:'Fiction', price:349, originalPrice:450, description:'A chilling dystopian warning depicting Oceania, Big Brother, Thought Police, and the struggle for individual truth.', coverImage:'/src/assets/images/book_1984_1793530490144.jpg', rating:4.9, pages:328, year:1949, featured:true, isbn:'978-0451524935' },
  { bookId:'the-kite-runner', title:'The Kite Runner', author:'Khaled Hosseini', category:'fiction', categoryLabel:'Fiction', price:429, originalPrice:550, description:'An unforgettable story of unlikely friendship, deep betrayal, and the quest for redemption against the backdrop of Afghanistan.', coverImage:'/src/assets/images/book_kite_runner_1793530491004.jpg', rating:4.8, pages:372, year:2003, featured:false, isbn:'978-1594631931' }
];

try {
  await connectDB();
  for (const book of books) {
    await Book.updateOne({ bookId: book.bookId }, { $set: book }, { upsert: true });
  }
  console.log(`Seeded ${books.length} books.`);
} catch (error) {
  console.error('Book seeding failed:', error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
