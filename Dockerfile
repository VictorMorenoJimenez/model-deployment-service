FROM node:10

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install

# Expose default port
EXPOSE 8085:8085

CMD ["npm", "start"]
