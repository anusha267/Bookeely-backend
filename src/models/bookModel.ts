import sql from '../config/database';

export interface Book {
  book_id: string; // UUID or String based on your database design
  title: string;
  author: string;
  genre: string;
  cover_image: string;
  description: string;
  average_rating: number;
  ratings_count: number;
  published_date: Date;
  created_at: Date;
  updated_at: Date;
}

// Create a new book
export const createBook = async (bookData: Omit<Book, 'book_id'>) => {
  const { title, author, genre, cover_image, description, published_date } = bookData;

  const result = await sql`INSERT INTO books (title, author, genre, cover_image, description, published_date)
                           VALUES (${title}, ${author}, ${genre}, ${cover_image}, ${description}, ${published_date})
                           RETURNING *`;

  return result[0]; // Returns the created book including book_id, created_at, updated_at
};

// Add other book-related database functions...
