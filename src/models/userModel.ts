import sql from "../config/database";

export interface User {
  user_id: string; // UUID or String based on your database design
  username: string;
  email: string;
  password_hash: string;
  profile_picture: string;
  created_at: Date;
  updated_at: Date;
}

// Create a new user
export const createUser = async (
  userData: Omit<User, "user_id" | "created_at" | "updated_at">
): Promise<User> => {
  const { username, email, password_hash, profile_picture } = userData;

  // Check if the email already exists
  const existingUserResult: Record<string, any>[] =
    await sql`SELECT COUNT(*) AS count FROM users WHERE email = ${email}`;
  if (existingUserResult[0].count > 0) {
    throw new Error("duplicate email: Email already in use");
  }

  // Use the sql instance to run the insert query
  const result: Record<string, any>[] =
    await sql`INSERT INTO users (username, email, password_hash, profile_picture)
                                                 VALUES (${username}, ${email}, ${password_hash}, ${profile_picture})
                                                 RETURNING *`;

  // Ensure the result is not empty and map it to the User type
  if (result.length > 0) {
    const createdUser: User = {
      user_id: result[0].user_id,
      username: result[0].username,
      email: result[0].email,
      password_hash: result[0].password_hash,
      profile_picture: result[0].profile_picture,
      created_at: result[0].created_at, // Convert to Date if needed
      updated_at: result[0].updated_at, // Convert to Date if needed
    };
    return createdUser; // Return the user with all properties
  }

  throw new Error("User creation failed"); // Handle the error appropriately
};

export const getUserByUsernameOrEmail = async (
  usernameOrEmail: string
): Promise<User | null> => {
  // Fetch the user by username
  try {
    const result =
      await sql`SELECT * FROM users WHERE username = ${usernameOrEmail} OR email = ${usernameOrEmail}`;
    // Since `result` might be inferred as any, we can cast it to User[]
    const users = result as User[];

    // Return the first user found or null if no user is found
    return users.length > 0 ? users[0] : null;
  } catch (e) {
    console.log(e);
  }

  return null;
};
// Add other user-related database functions...
