import bcrypt from "bcrypt";
import { createUser } from "../models/userModel";
import { getUserByUsernameOrEmail } from "../models/userModel"; // Import a function to get a user by email
import jwt from "jsonwebtoken";
import { User } from "../models/userModel"; // Ensure you have the User interface imported

const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret"; // Use a strong secret key

export const registerUser = async (
  email: string,
  password: string,
  username: string
): Promise<User> => {
  const password_hash = await bcrypt.hash(password, 10);

  // Create a new user in the database
  const newUser = await createUser({
    username,
    email,
    password_hash,
    profile_picture: "", // Default value for profile picture
  });

  return newUser;
};

export const loginUser = async (usernameOrEmail: string, password: string) => {
  const user = await getUserByUsernameOrEmail(usernameOrEmail); // Retrieve the user by email

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }
  delete user.password_hash;
  // Generate JWT token
  const token = jwt.sign(
    {
      user_details: {
        ...user,
      },
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
      algorithm: "HS256",
    }
  );

  return { token, userId: user.user_id };
};
