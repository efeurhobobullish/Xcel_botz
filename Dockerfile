FROM node:16.18.0
WORKDIR /app

# Clone the repository
RUN git clone https://github.com/Xcelsama/Xcel_botz.git

# Move into the repository directory
WORKDIR /app/Xcel_botz

# Install dependencies
RUN npm install npm@latest
RUN yarn install --network-concurrency 1

# Expose the port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]