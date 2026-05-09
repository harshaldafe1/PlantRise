# Makefile for Vite React TypeScript project

.PHONY: help install dev build build-dev lint test test-watch preview clean all

# Default target
help:
	@echo "Available commands:"
	@echo "  make install     - Install dependencies"
	@echo "  make dev         - Start development server"
	@echo "  make build       - Build for production"
	@echo "  make build-dev   - Build for development"
	@echo "  make lint        - Run linter"
	@echo "  make test        - Run tests"
	@echo "  make test-watch  - Run tests in watch mode"
	@echo "  make preview     - Preview production build"
	@echo "  make clean       - Clean build artifacts"
	@echo "  make all         - Install, lint, test, and build"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	npm install

# Start development server
dev:
	@echo "🚀 Starting development server..."
	npm run dev

# Build for production
build:
	@echo "🏗️  Building for production..."
	npm run build

# Build for development
build-dev:
	@echo "🏗️  Building for development..."
	npm run build:dev

# Run linter
lint:
	@echo "🔍 Running linter..."
	npm run lint

# Run tests
test:
	@echo "🧪 Running tests..."
	npm run test

# Run tests in watch mode
test-watch:
	@echo "🧪 Running tests in watch mode..."
	npm run test:watch

# Preview production build
preview:
	@echo "👀 Previewing production build..."
	npm run preview

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist
	rm -rf node_modules/.vite
	@echo "✓ Clean complete"

# Full build pipeline
all: install lint test build
	@echo "✓ All tasks completed successfully!"
