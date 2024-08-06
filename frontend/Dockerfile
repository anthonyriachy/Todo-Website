FROM node:20

WORKDIR /app

COPY package*.json ./



RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"] 




# #base image
# FROM node

# #S->create a system user 
# #G->add to user to the group
# #for the persmissions ... to avoid running it as root user 

# RUN addgroup app && adduser -S -G app app

# # set the user to run the app
# #all following commands in this file will be ran under this user 
# USER app

# #set the working directory
# #All followong commands that reference files will be relative to this directory
# WORKDIR /app

# #copy the package and package-lock to the working directory 
# #this is done before the  rest of the file to take advantage to docker   cache
# # if they are not changes docker will use the cached version
# #./ means in the /app
# COPY package*.json ./

# #sometime the ownership of the files in the working directory is changed to root 
# #and thus the app can;t access the files and throws error-> EACCES:permission denied
# #to avoid this, change the ownership of the files to the root user
# #these 2 steps bellow is to set the app ownership to user we created
# #we switch to root because of permissions
# USER root 

# #change the ownersihp of the /app to the app user
# #chown -R <user>:<group> <directoty>
# RUN chown -R app:app .

# #switch back to  app user
# USER app

# RUN npm install 


# COPY . .

# EXPOSE 3000

# CMD npm run dev



