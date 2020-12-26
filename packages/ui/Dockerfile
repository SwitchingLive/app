FROM node:14 as build
WORKDIR /switchinglive/app/ui
ADD . .
RUN yarn
RUN yarn run build
RUN ls /switchinglive/app/ui

FROM nginx:1.15
ADD ./nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /switchinglive/app/ui
ADD ./src/public/* ./public/
COPY --from=build /switchinglive/app/ui/dist/* ./public/dist/
