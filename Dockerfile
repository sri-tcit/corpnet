
FROM node:13.12.0-alpine as build
WORKDIR /corpnet
ENV PATH /corpnet/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN yarn install
COPY . ./
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /corpnet/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
