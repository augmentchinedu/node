FROM node:20-alpine

WORKDIR /app

# Install git and bash for submodules
RUN apk add --no-cache git bash

# Copy repo
COPY . .

# Initialize submodules
RUN git submodule update --init --recursive

# Debug
RUN ls -la /app/build

# Run build script
RUN node build/index.js

# Install dependencies
RUN npm install --omit=dev

# Set env and start
ENV PORT=3000
EXPOSE 3000
CMD ["node", "index.js"]
