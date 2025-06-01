# frontend/Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build React app
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Expose frontend port
EXPOSE 3000

# Serve the build
CMD ["serve", "-s", "build"]
