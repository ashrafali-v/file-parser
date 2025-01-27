# Base image with Node.js
FROM node:18-slim AS generator

# Set working directory for the first build stage
WORKDIR /app

# Copy generator script into the working directory
COPY challengeA.js .

# Run the data generation script during image build
RUN node challengeA.js

# Start second build stage with a fresh Node.js image
FROM node:18-slim

# Set working directory for the second stage
WORKDIR /app

# Copy generated data file from previous stage
COPY --from=generator /app/random_objects.txt .

# Copy parser script into working directory
COPY challengeB.js .

# Ensure the output directory is writable
VOLUME /app/output

# Default command to run when container starts
CMD ["node", "challengeB.js"]