# Use an official Node.js runtime as a parent image
FROM node:18-alpine

RUN npm install nodemon -g

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application code (this is mostly for initial build, volume will override for hot reload)
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the application
CMD [ "nodemon", "index.js" ]
