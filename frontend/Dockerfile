FROM node:16

WORKDIR /react-app

COPY package.json .

RUN npm install 

COPY . .

CMD ["npm" , "run" ,"start"]