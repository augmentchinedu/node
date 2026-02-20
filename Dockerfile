FROM node:20

WORKDIR /app

# Copy generated package.json
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy rest of app
COPY . .

# Expose Flex port
EXPOSE 8080

# Start server
CMD ["node", "index.js"]