# Use a minimal base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Node.js script and text files into the container
COPY script.js ./
COPY IF.txt /home/data/IF.txt
COPY Limerick-1.txt /home/data/Limerick-1.txt

# Run the Node.js script when the container starts
CMD ["node", "script.js"]
