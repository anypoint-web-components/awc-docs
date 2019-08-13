FROM node:10

COPY package*.json ./

RUN npm install --only=production

COPY dist/ /app/
COPY app.js /app/
COPY config.js /app/

CMD [ "npm", "start" ]
