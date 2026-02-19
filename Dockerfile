FROM node:20-alpine

WORKDIR /app

# Copy everything
COPY . .

# Debug: verify files
RUN ls -la /app
RUN ls -la /app/build

# 1️⃣ Run the build script
RUN node build/index.js

# 2️⃣ Install dependencies
RUN npm install --omit=dev

# 3️⃣ Read client.name from file and pass as build ARG
ARG CLIENT_NAME
RUN export NAME=$(cat /app/CLIENT_NAME) && echo "Client name: $NAME"

# 4️⃣ Set ENV using the ARG
ENV NAME=$CLIENT_NAME
ENV PORT=3000

EXPOSE 3000

CMD ["node", "index.js"]
