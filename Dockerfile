FROM nginx
COPY ./nginx.conf /etc/nginx/templates/default.conf.template

ENV NODE_ENV production
ENV NGINX_PORT 80
ENV BACK_PORT 8000
ENV BACK_IP localhost

COPY /build /usr/share/nginx/html
EXPOSE 80
