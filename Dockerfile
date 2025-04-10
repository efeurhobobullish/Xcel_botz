FROM node:18-buster

# Install canvas dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# Clear NPM cache, install dependencies
RUN npm cache clean --force && \
    npm install --legacy-peer-deps && \
    npm install -g qrcode-terminal pm2

COPY . .

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
