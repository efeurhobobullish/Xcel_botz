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

# Downgrade npm to a stable version
RUN npm install -g npm@8

# Clear corrupted cache and remove any existing node_modules
RUN rm -rf /root/.npm /usr/src/app/node_modules && npm cache clean --force

# Install global packages
RUN npm install -g qrcode-terminal pm2

# Set working directory
WORKDIR /usr/src/app

# Copy application files
COPY . .

# Install application dependencies
RUN npm install

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
