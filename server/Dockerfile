FROM node:22-alpine
WORKDIR /app

COPY package.json package.json
COPY client/package.json client/package.json
COPY server/package.json server/package.json
RUN npm install

COPY server server
WORKDIR /app/server
RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "start"]
