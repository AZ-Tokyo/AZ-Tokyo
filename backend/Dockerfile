# syntax=docker/dockerfile:1

# Build stage
FROM golang:1.25.5-alpine AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

WORKDIR /app/cmd/server
RUN CGO_ENABLED=0 GOOS=linux go build -o /server

# Final stage
FROM gcr.io/distroless/static-debian11

COPY --from=build /server /
EXPOSE 8080
CMD ["/server"]
