# Use the official Node.js image with Alpine Linux as the base image
FROM ubuntu:20.04

#Install curl
RUN apt-get -y update
RUN apt-get install apt-utils -y
RUN apt-get -y install curl

#Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get install nodejs

# Install MySQL Client
RUN apt install mysql-client -y

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Define the command to start your Node.js application
CMD [ "npm", "start" ]