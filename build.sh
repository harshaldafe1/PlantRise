#!/bin/bash

# Build script for Vite React TypeScript project
# This script handles the complete build process including linting, testing, and building

set -e  # Exit on error

echo "🚀 Starting build process..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Installing dependencies..."
    npm install
    print_status "Dependencies installed"
else
    print_status "Dependencies found"
fi

# Run linting
echo ""
echo "🔍 Running linter..."
if npm run lint; then
    print_status "Linting passed"
else
    print_error "Linting failed"
    exit 1
fi

# Run tests
echo ""
echo "🧪 Running tests..."
if npm run test; then
    print_status "Tests passed"
else
    print_error "Tests failed"
    exit 1
fi

# Build the project
echo ""
echo "🏗️  Building project..."
if npm run build; then
    print_status "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Check if dist directory was created
if [ -d "dist" ]; then
    print_status "Build output created in dist/"
    
    # Display build size
    echo ""
    echo "📦 Build size:"
    du -sh dist/
    
    # List main files
    echo ""
    echo "📄 Main build files:"
    ls -lh dist/
else
    print_error "dist/ directory not found"
    exit 1
fi

echo ""
print_status "Build process completed successfully! 🎉"
echo ""
echo "To preview the build, run: npm run preview"
