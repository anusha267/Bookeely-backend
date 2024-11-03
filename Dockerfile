# Use the official Node.js image.
FROM node:23

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available).
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the application (if necessary).
RUN npm run start:prod

# Expose the port that your app runs on.
EXPOSE 8080

# Command to run the application.
CMD ["node", "dist/index.js"]  # Adjust the command based on your app entry point.
