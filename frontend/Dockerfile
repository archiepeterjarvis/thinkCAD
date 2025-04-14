# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install deps first (to leverage Docker caching)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the port Next.js will run on
EXPOSE 3000

# Run the Next.js production server
CMD ["yarn", "start"]
