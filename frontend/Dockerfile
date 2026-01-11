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
ENV API_URL="http://localhost:8080"

RUN mkdir -p /etc/nginx/templates/ && \
    printf 'server {\n\
    listen 8080;\n\
    server_name localhost;\n\
    \n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    \n\
    location /api {\n\
        proxy_pass ${API_URL}/api;\n\
    }\n\
}' > /etc/nginx/templates/default.conf.template

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
