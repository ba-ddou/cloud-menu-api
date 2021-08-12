FROM node:10

WORKDIR /usr/src/app

ENV PORT 8080

COPY package*.json ./

RUN yarn install --only=production
RUN yarn add @cloudmenu/cloud-menu-shared-libs

COPY . .

# RUN npm run build

CMD yarn serve