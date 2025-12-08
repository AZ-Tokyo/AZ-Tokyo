BACKEND_DIR := backend
FRONTEND_DIR := frontend
GO_CMD := go
NPM_CMD := npm

.DEFAULT:	help

.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make setup         - Install dependencies for both backend and frontend"
	@echo "  make dev           - Run both backend and frontend in development mode"
	@echo "  make test          - Run tests for both"
	@echo ""
	@echo "Backend specific:"
	@echo "  make dev-backend   - Run backend server"
	@echo "  make test-backend  - Run backend tests"
	@echo ""
	@echo "Frontend specific:"
	@echo "  make dev-frontend  - Run frontend dev server"
	@echo "  make test-frontend - Run frontend tests"

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

