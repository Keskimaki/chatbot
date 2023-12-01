FROM docker.io/node:lts-slim

ENV TZ="Europe/Helsinki"

WORKDIR /opt/app-root/src

COPY package* ./
RUN npm i

EXPOSE 3000

CMD ["npm", "run", "dev"]
