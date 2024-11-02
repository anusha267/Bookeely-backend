import { Request, Response } from 'express';
import { createBook } from '../models/bookModel';

export const addBook = async (req: Request, res: Response) => {
  const { title, author, genre, coverImage, description, publishedDate } = req.body;

  try {
    const newBook = await createBook({
    title,
    author,
    genre,
    cover_image: coverImage || '', // Default to empty string if not provided
    description: description || '', // Default to empty string if not provided
    published_date: publishedDate,
    average_rating: 0, // Default value for average rating
    ratings_count: 0, // Default value for ratings count
    created_at: new Date(), // Optional, can be set by the database
    updated_at: new Date() // Optional, can be set by the database
  });
    res.status(201).json({ message: 'Book created successfully', bookId: newBook.book_id });
  } catch (error) {
    res.status(400).json({ error: 'Validation error' });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  // Logic to retrieve all books
};

// Add other book-related endpoints...
