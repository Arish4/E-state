# Use Node 22
FROM node:22-bullseye

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy the rest of the code
COPY backend/. .

# Set environment variable
ENV PORT=4000

# Expose port
EXPOSE 4000

# Start server
CMD ["node", "server.js"]
