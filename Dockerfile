# Use an image with standard Debian toolchain so native modules build correctly
FROM node:22-bullseye

# Install build deps for native addons (node-gyp) and sqlite compilation
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    pkg-config \
    libsqlite3-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install dependencies first (cache layer)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy app sources
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

# Adjust the start command if your app uses a different entry
CMD ["node", "server.js"]
