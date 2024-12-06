# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built assets and required files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/server ./src/server

# Install production dependencies
RUN npm install --production

# Create data directory
RUN mkdir -p data

EXPOSE 3000

# Start the server
CMD ["node", "src/server/index.js"]