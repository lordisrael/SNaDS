# 1. Use an official Node.js base image
FROM node:18-alpine

# 2 Working Directory
WORKDIR /app
# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install dependencies
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then \
      npm install; \
    else \
      npm install --only=production; \
    fi
# 5. Copy the rest of the application code
COPY . .
# 6. Set environment variables
ENV PORT=3000

# 7. Expose the application port
EXPOSE ${PORT}

# 8. Start the application
CMD ["npm", "start"]
