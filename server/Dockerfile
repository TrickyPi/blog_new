FROM node:lts
WORKDIR /server
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm","run","build"] 