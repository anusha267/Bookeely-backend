import { Request, Response } from 'express';
import { createReadLog } from '../models/logModel';

export const addReadLog = async (req: Request, res: Response) => {
  const { userId, bookId, startedReadingAt } = req.body;

  try {
    const newLog = await createReadLog({
    user_id: userId,
    book_id: bookId,
    started_reading_at: new Date(startedReadingAt),
    finished_reading_at: null, // Default value for finished_reading_at
    created_at: new Date(), // Optional, can be set by the database
    updated_at: new Date() // Optional, can be set by the database
  });
    res.status(201).json({ message: 'Log created successfully', logId: newLog.log_id });
  } catch (error) {
    res.status(400).json({ error: 'Validation error' });
  }
};

// Add other log-related endpoints...
