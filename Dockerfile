FROM quay.io/maherzubair/sigma-md:beta
RUN git clone https://github.com/Xcelsama/Xcel_botz/root/Xcel_botz
WORKDIR /root/Xcel_botz/
RUN npm install npm@latest
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]