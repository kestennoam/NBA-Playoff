FROM node:16 AS ui-build
WORKDIR /usr/src/app
COPY client/my-app/ ./my-app/
RUN cd my-app && npm install && npm run build

FROM node:16 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/my-app/build ./my-app/build
COPY server/package*.json ./api/
RUN cd api && npm install
COPY server/ ./api/

EXPOSE 3001

CMD ["node", "./api/index.js"]