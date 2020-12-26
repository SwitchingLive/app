FROM node:14
WORKDIR /switchinglive/app/core
ADD . .
RUN apt-get update && apt-get install udev -y
RUN yarn
RUN yarn run build

CMD yarn run prod