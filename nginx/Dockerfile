# frontendのbuildを構築
FROM node:14.18-alpine3.14 as builder
WORKDIR /usr/src/app

COPY ./frontend /usr/src/app
RUN npm run build

# nginxにbuildを移す
FROM nginx:1.20.2-alpine

RUN rm -f /etc/nginx/conf.d/*
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /var/www

WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]

EXPOSE 80
