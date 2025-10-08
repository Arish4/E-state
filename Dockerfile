FROM node:22-bullseye

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json from backend folder
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY backend/. .
# Set environment variable
ENV PORT=4000
# Expose port
EXPOSE 4000

# Start the app
CMD ["node", "server.js"]
