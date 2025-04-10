FROM node:lts-buster

# Install dependencies for canvas
RUN apt-get update && apt-get install -y \
  build-essential \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev \
  && rm -rf /var/lib/apt/lists/*

# Use legacy peer deps to avoid conflicts
RUN npm install --legacy-peer-deps && npm install -g qrcode-terminal pm2

COPY . .

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
