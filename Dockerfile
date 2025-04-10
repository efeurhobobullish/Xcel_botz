# Use the official Node.js image from the Docker Hub
FROM node:18-buster

# Install system dependencies for canvas and other potential dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# Downgrade npm to avoid known bugs and rubbish bruh
RUN npm install -g npm@8

# Clear corrupted npm cache and install global dependencies
RUN rm -rf /root/.npm && npm cache clean --force
RUN npm install -g qrcode-terminal pm2

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json separately to optimize layer caching
COPY package*.json ./

# Install all dependencies (including fs-extra)
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the app's port (use your app's port here)
EXPOSE 3000  

# Start the app using npm
CMD ["npm", "start"]
