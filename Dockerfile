FROM node:10.16.3-jessie

WORKDIR /usr/src/polsl-tai-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]