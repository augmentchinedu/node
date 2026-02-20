FROM node:20-alpine
WORKDIR /app

# Copy repo contents including build script
COPY . .

ARG ID
ENV ID=${ID}
ENV NAME=unknown

RUN echo "Building with ID=$ID"

# Make sure build/index.js exists and is executable
RUN [ -f build/index.js ] || (echo "Error: build/index.js not found" && exit 1)

# Run build script to generate package.json
RUN node build/index.js

# Install dependencies (package.json now exists)
RUN npm install --omit=dev

ENV PORT=3000
EXPOSE 3000

CMD ["node", "index.js"]