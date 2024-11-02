import sql from '../config/database';

export interface ReadLog {
  log_id: string; // UUID or String based on your database design
  user_id: string;
  book_id: string;
  started_reading_at: Date;
  finished_reading_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

// Create a new reading log
export const createReadLog = async (logData: Omit<ReadLog, 'log_id'>) => {
  const { user_id, book_id, started_reading_at } = logData;

  const result = await sql`INSERT INTO read_logs (user_id, book_id, started_reading_at)
                           VALUES (${user_id}, ${book_id}, ${started_reading_at})
                           RETURNING *`;

  return result[0]; // Returns the created log including log_id, created_at, updated_at
};

// Add other log-related database functions...
