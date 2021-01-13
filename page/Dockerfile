FROM node:lts as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org
RUN npm i
COPY . .
RUN npm run docs:build
FROM nginx:1.16.1
RUN rm /etc/nginx/conf.d/default.conf
COPY ./web.conf /etc/nginx/conf.d/
COPY --from=build-stage /app/docs/.vuepress/dist/ /blog
EXPOSE 80
CMD ["nginx","-g","daemon off;"]