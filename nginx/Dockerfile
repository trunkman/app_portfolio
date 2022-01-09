FROM nginx:1.20.2-alpine

RUN rm -f /etc/nginx/conf.d/*
COPY ./nginx/nginx.conf /etc/nginx/conf.d/myapp.conf
COPY ./nginx/build /var/www

WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]

EXPOSE 80
