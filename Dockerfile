FROM quay.io/sampandey001/secktor

WORKDIR /root/STAR-KING0

RUN rm -rf node_modules package-lock.json && npm install --force --no-audit --no-fund

CMD ["npm", "start"]