BACKEND_DIR := backend
FRONTEND_DIR := frontend
GO_CMD := go
NPM_CMD := npm

.DEFAULT:	help

.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make install       - Install dependencies for both backend and frontend"
	@echo "  make dev           - Run both backend and frontend in development mode"
	@echo "  make test          - Run tests for both"
	@echo "  make up            - Start Docker containers in detached mode"
	@echo "  make down          - Stop and remove Docker containers"
	@echo "  make build         - Build Docker images"
	@echo "  make gen-types     - Generate TypeScript types from Go structs"

# ---------------------------------------------------------
# Install dependencies
# ---------------------------------------------------------
.PHONY: install install-backend install-frontend
install: install-backend install-frontend

install-backend:
	cd $(BACKEND_DIR) && $(GO_CMD) mod download

install-frontend:
	cd $(FRONTEND_DIR) && $(NPM_CMD) install

# ---------------------------------------------------------
# Development
# ---------------------------------------------------------
.PHONY: dev dev-backend dev-frontend
dev:
	@echo "Starting database..."
	docker compose up -d db
	@echo "Starting both backend and frontend..."
	@$(MAKE) -j2 dev-backend dev-frontend

dev-backend:
	cd $(BACKEND_DIR) && $(GO_CMD) run cmd/server/main.go

dev-frontend:
	cd $(FRONTEND_DIR) && $(NPM_CMD) run dev

# ---------------------------------------------------------
# Test
# ---------------------------------------------------------
.PHONY: test test-backend test-frontend
test: test-backend test-frontend

test-backend:
	cd $(BACKEND_DIR) && $(GO_CMD) test ./...

test-frontend:
	cd $(FRONTEND_DIR) && $(NPM_CMD) run test

# ---------------------------------------------------------
# Docker compose
# ---------------------------------------------------------
.PHONY: up down build
up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose build --no-cache

# ---------------------------------------------------------
# Code Generation
# ---------------------------------------------------------
.PHONY: gen-types
gen-types: install-backend
	cd $(BACKEND_DIR) && $(GO_CMD) run github.com/gzuidhof/tygo@latest generate
