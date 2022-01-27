# frontendのbuildを構築
FROM node:14.18-alpine3.14 as builder
WORKDIR /usr/src/app

# 環境変数を設定
ARG REACT_APP_AWS_ACCESS_KEY
ARG REACT_APP_AWS_BUCKET
ARG REACT_APP_AWS_SECRET_KEY
ARG REACT_APP_AWS_REGION
ARG REACT_APP_ENV
ENV REACT_APP_AWS_ACCESS_KEY $REACT_APP_AWS_ACCESS_KEY
ENV REACT_APP_AWS_BUCKET $REACT_APP_AWS_BUCKET
ENV REACT_APP_AWS_SECRET_KEY $REACT_APP_AWS_SECRET_KEY
ENV REACT_APP_AWS_REGION $REACT_APP_AWS_REGION
ENV REACT_APP_ENV $REACT_APP_ENV

COPY ./frontend /usr/src/app
RUN npm run build

# nginxにbuildを配置
FROM nginx:1.20.2-alpine

RUN rm -f /etc/nginx/conf.d/*
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /var/www

WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]

EXPOSE 80
