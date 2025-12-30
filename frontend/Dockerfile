# syntax=docker/dockerfile:1

# Build stage
FROM node:25.2.1-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Final stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Cloud Run defaults to port 8080. Configure Nginx to listen on 8080.
RUN sed -i 's/listen       80;/listen       8080;/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
