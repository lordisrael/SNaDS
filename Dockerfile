# # 1. Use an official Node.js base image
# FROM node:18-alpine

# # 2 Working Directory
# WORKDIR /app
# # 3. Copy package.json and package-lock.json
# COPY package*.json ./

# # 4. Install dependencies
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ]; then \
#       npm install; \
#     else \
#       npm install --only=production; \
#     fi
# # 5. Copy the rest of the application code
# COPY . .

# RUN npm run build
# # 6. Set environment variables
# ENV PORT=3000

# # 7. Expose the application port
# EXPOSE ${PORT}

# # 8. Start the application
# CMD ["npm", "start"]

# 1. Base stage
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# 2. Development stage
FROM base AS development
RUN npm install
COPY . .
# ensure swagger.yaml is copied
COPY swagger.yaml ./swagger.yaml
CMD ["npm", "run", "dev"]

# 3. Build stage (for prod)
FROM development AS build
RUN npm run build

# 4. Production stage
FROM base AS production
RUN npm install --only=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/swagger.yaml ./swagger.yaml
COPY --from=build /app/package*.json ./

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE ${PORT}

CMD ["npm", "start"]

