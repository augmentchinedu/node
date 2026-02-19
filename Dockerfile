FROM node:20-alpine
WORKDIR /app

# Copy everything
COPY . .

# If using submodule: make sure to fetch it
RUN git submodule update --init --recursive

# Debug: check build folder
RUN ls -la /app/build

# Run the build script (creates package.json etc.)
RUN [ -f build/index.js ] && node build/index.js || echo "No build/index.js found"

# Install dependencies if package.json exists
RUN if [ -f package.json ]; then npm install --omit=dev; fi

ENV PORT=3000
EXPOSE 3000

CMD ["node", "index.js"]
