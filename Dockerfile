# Use the official Node.js 14 image as the base image
FROM node:14


ENV DB_HOST=${DB_HOST}
ENV DB_PORT=5432
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV PORT=8080
ENV NODE_ENV=${ENV}

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all files to the working directory in the container
COPY . .

# Expose the port your app is running on
EXPOSE 8080

# Start the application
CMD ["node", "index.js"]
