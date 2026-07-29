# Use Node.js 22 Alpine base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files and Prisma configuration
COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy application source code
COPY src ./src

# Set placeholder DATABASE_URL for client generation during build
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"

# Generate Prisma Client (outputs to src/generated/prisma)
RUN npx prisma generate

# Expose default application port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Run database push/migrations before starting server
CMD ["sh", "-c", "npx prisma db push && npm start"]
