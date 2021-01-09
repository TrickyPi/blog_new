FROM node:lts
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","build"] 