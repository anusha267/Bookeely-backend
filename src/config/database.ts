import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Neon SQL client
const sql = neon(process.env.DATABASE_URL || '');

// Export the sql client for use in your application
export default sql;
