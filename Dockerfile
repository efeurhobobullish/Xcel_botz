FROM node:lts-buster

WORKDIR /app

COPY package*.json ./

# Use legacy-peer-deps to avoid peer dependency conflicts
RUN npm install --legacy-peer-deps && npm install -g qrcode-terminal pm2

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
