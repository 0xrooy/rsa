# Use a lightweight Node.js image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000

# Start in dev mode
CMD ["npm", "run", "dev"]
