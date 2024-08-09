FROM node:20

#RUN addgroup app && adduser -S -G app app #extra for security
#USER app #extra for security
WORKDIR /app
COPY package*.json ./
#USER root #extra for security
#RUN chown -R app:app .#extra for security
#USER app#extra for security
RUN npm install 

COPY . .
EXPOSE 3080
CMD ["npm","start"]



