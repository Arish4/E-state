FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json from backend folder
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY backend/. .

# Expose port
EXPOSE 4000

# Start the app
CMD ["node", "server.js"]
