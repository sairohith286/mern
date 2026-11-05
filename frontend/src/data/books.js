
import atomicHabits from '../assets/images/book_atomic_habits_1793530486167.jpg';
import psychologyMoney from '../assets/images/book_psychology_money_1793530488565.jpg';
import deepWork from '../assets/images/book_deep_work_1793530486963.jpg';

import meditations from '../assets/images/book_meditations_1793530488756.jpg';
import republic from '../assets/images/book_the_republic_1793530488726.jpg';
import stranger from '../assets/images/book_the_stranger_1793530489534.jpg';

import alchemist from '../assets/images/book_the_alchemist_1793530490739.jpg';
import book1984 from '../assets/images/book_1984_1793530490144.jpg';
import kiteRunner from '../assets/images/book_kite_runner_1793530491004.jpg';

import selfHelpCategory from '../assets/images/cat_self_help_1793530463583.jpg';
import philosophyCategory from '../assets/images/cat_philosophy_1793530464147.jpg';
import fictionCategory from '../assets/images/cat_fiction_1793530464128.jpg';


export const BOOKS = [
    // Category 1: Self-Help Books
    {
        id: 'atomic-habits',
        title: 'Atomic Habits',
        author: 'James Clear',
        category: 'self-help',
        categoryLabel: 'Self-Help',
        price: 499,
        originalPrice: 699,
        description: 'An easy & proven way to build good habits & break bad ones through tiny, incremental daily transformations.',
        coverImage: atomicHabits,
        rating: 4.8,
        pages: 320,
        year: 2018,
        featured: true,
        isbn: '978-0735211292',
    },
    {
        id: 'psychology-of-money',
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        category: 'self-help',
        categoryLabel: 'Self-Help',
        price: 399,
        originalPrice: 499,
        description: 'Timeless lessons on wealth, greed, and happiness exploring how people think about money and behavioral finance.',
        coverImage: psychologyMoney,
        rating: 4.7,
        pages: 256,
        year: 2020,
        featured: true,
        isbn: '978-9390166268',
    },
    {
        id: 'deep-work',
        title: 'Deep Work',
        author: 'Cal Newport',
        category: 'self-help',
        categoryLabel: 'Self-Help',
        price: 449,
        originalPrice: 599,
        description: 'Rules for focused success in a distracted world, teaching how to cultivate deep concentration in a hyper-connected age.',
        coverImage: deepWork,
        rating: 4.6,
        pages: 304,
        year: 2016,
        featured: false,
        isbn: '978-1455586691',
    },

    // Category 2: Philosophy Books
    {
        id: 'meditations',
        title: 'Meditations',
        author: 'Marcus Aurelius',
        category: 'philosophy',
        categoryLabel: 'Philosophy',
        price: 349,
        originalPrice: 450,
        description: 'Private reflections and enduring Stoic wisdom from the Roman Emperor on resilience, virtue, and tranquility.',
        coverImage: meditations,
        rating: 4.9,
        pages: 254,
        year: 180,
        featured: true,
        isbn: '978-0140449334',
    },
    {
        id: 'the-republic',
        title: 'The Republic',
        author: 'Plato',
        category: 'philosophy',
        categoryLabel: 'Philosophy',
        price: 389,
        originalPrice: 499,
        description: 'The foundational cornerstone of Western political philosophy examining justice, the ideal city-state, and the Allegory of the Cave.',
        coverImage: republic,
        rating: 4.5,
        pages: 416,
        year: -375,
        featured: false,
        isbn: '978-0140455113',
    },
    {
        id: 'the-stranger',
        title: 'The Stranger',
        author: 'Albert Camus',
        category: 'philosophy',
        categoryLabel: 'Philosophy',
        price: 299,
        originalPrice: 399,
        description: 'A masterpiece of Absurdist literature chronicling Meursault, a man emotionally detached from societal expectations in Algiers.',
        coverImage: stranger,
        rating: 4.6,
        pages: 160,
        year: 1942,
        featured: true,
        isbn: '978-0679720201',
    },

    // Category 3: Fiction Books
    {
        id: 'the-alchemist',
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        category: 'fiction',
        categoryLabel: 'Fiction',
        price: 329,
        originalPrice: 420,
        description: 'A lyrical fable about following your dream and listening to your heart through Santiago’s journey to the Egyptian pyramids.',
        coverImage: alchemist,
        rating: 4.8,
        pages: 208,
        year: 1988,
        featured: true,
        isbn: '978-0062315007',
    },
    {
        id: '1984',
        title: '1984',
        author: 'George Orwell',
        category: 'fiction',
        categoryLabel: 'Fiction',
        price: 349,
        originalPrice: 450,
        description: 'A chilling dystopian warning depicting Oceania, Big Brother, Thought Police, and the struggle for individual truth.',
        coverImage: book1984,
        rating: 4.9,
        pages: 328,
        year: 1949,
        featured: true,
        isbn: '978-0451524935',
    },
    {
        id: 'the-kite-runner',
        title: 'The Kite Runner',
        author: 'Khaled Hosseini',
        category: 'fiction',
        categoryLabel: 'Fiction',
        price: 429,
        originalPrice: 550,
        description: 'An unforgettable story of unlikely friendship, deep betrayal, and the quest for redemption against the backdrop of Afghanistan.',
        coverImage: kiteRunner,
        rating: 4.8,
        pages: 372,
        year: 2003,
        featured: false,
        isbn: '978-1594631931',
    },
];


export const CATEGORIES = [
    {
        id: 'all',
        label: 'All Books',
        count: 9,
    },
    {
        id: 'self-help',
        label: 'Self-Help',
        description: 'Practical frameworks, mindful habits, and strategies for personal growth and sustained focus.',
        count: 3,
        image: selfHelpCategory,
    },
    {
        id: 'philosophy',
        label: 'Philosophy',
        description: 'Timeless meditations, classic dialogues, and deep inquiries into meaning, ethics, and human nature.',
        count: 3,
        image: philosophyCategory,
    },
    {
        id: 'fiction',
        label: 'Fiction',
        description: 'Imaginative journeys, celebrated prose, and profound narratives that reveal the human spirit.',
        count: 3,
        image: fictionCategory,
    },
];
