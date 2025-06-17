# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application code (this is mostly for initial build, volume will override for hot reload)
COPY . .

# Define the command to run the worker application
CMD [ "node", "index.js" ]