FROM node:18.15.0-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json .
COPY package-lock.json .
RUN npm install --legacy-peer-deps --production
COPY . .
CMD ["npm", "start"]