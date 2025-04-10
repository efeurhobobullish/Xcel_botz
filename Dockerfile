FROM node:18-buster

# Install system dependencies for canvas
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# Downgrade npm to avoid known bugs
RUN npm install -g npm@8

# Clear corrupted npm cache and install dependencies
RUN rm -rf /root/.npm && npm cache clean --force

# Ensure dependencies are installed (including fs-extra)
COPY package*.json ./
RUN npm install

# Install global dependencies
RUN npm install -g qrcode-terminal pm2

# Copy the rest of the application files
COPY . .

EXPOSE 3000  

CMD ["npm", "start"]
