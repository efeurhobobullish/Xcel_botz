FROM quay.io/sampandey001/secktor  

WORKDIR /root/STAR-KING0  

RUN npm install --no-audit --no-fund  

CMD ["npm", "start"]