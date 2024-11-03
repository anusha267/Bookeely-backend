# Use the official Node.js image from Docker Hub.
FROM node:18

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container.
COPY package*.json ./

# Install application dependencies.
RUN npm install

# Copy the rest of your application code to the container.
COPY . .

# Expose the port that your application will run on.
EXPOSE 8080

# Command to run your application.
CMD [ "npm", "start" ]
