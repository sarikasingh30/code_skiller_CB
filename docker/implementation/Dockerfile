# fetch the most recent version of the Node.js image from Docker Hub
FROM node:latest     

# 1st way : 
    # copies the server.js file from your local machine to the container
    # COPY server.js /home/app/server.js

    # copies the package.json file from your local machine to the container
    # COPY package.json  /home/app/package.json

    # copies the package-lock.json file from your local machine to the container
    # COPY package-lock.json  /home/app/package-lock.json

# 2nd way : 
    # copies all files together
COPY . /home/app

# Sets `/home/app/` as the working directory for the container
WORKDIR /home/app/

# installs all the dependencies listed in package.json inside the container
RUN npm install

# Specifies that the container listens for network connections on port `8080`
EXPOSE 8080

# Specifies the command to execute when the container starts
CMD ["node", "server.js"]