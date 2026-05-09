# Build script for Vite React TypeScript project (PowerShell)
# This script handles the complete build process including linting, testing, and building

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting build process..." -ForegroundColor Cyan

function Print-Status {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Print-Warning {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Print-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Print-Warning "node_modules not found. Installing dependencies..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Print-Error "Failed to install dependencies"
        exit 1
    }
    Print-Status "Dependencies installed"
} else {
    Print-Status "Dependencies found"
}

# Run linting
Write-Host ""
Write-Host "🔍 Running linter..." -ForegroundColor Cyan
npm run lint
if ($LASTEXITCODE -ne 0) {
    Print-Error "Linting failed"
    exit 1
}
Print-Status "Linting passed"

# Run tests
Write-Host ""
Write-Host "🧪 Running tests..." -ForegroundColor Cyan
npm run test
if ($LASTEXITCODE -ne 0) {
    Print-Error "Tests failed"
    exit 1
}
Print-Status "Tests passed"

# Build the project
Write-Host ""
Write-Host "🏗️  Building project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Print-Error "Build failed"
    exit 1
}
Print-Status "Build completed successfully"

# Check if dist directory was created
if (Test-Path "dist") {
    Print-Status "Build output created in dist/"
    
    # Display build size
    Write-Host ""
    Write-Host "📦 Build size:" -ForegroundColor Cyan
    $distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host ("{0:N2} MB" -f $distSize)
    
    # List main files
    Write-Host ""
    Write-Host "📄 Main build files:" -ForegroundColor Cyan
    Get-ChildItem -Path "dist" | Format-Table Name, Length, LastWriteTime
} else {
    Print-Error "dist/ directory not found"
    exit 1
}

Write-Host ""
Print-Status "Build process completed successfully! 🎉"
Write-Host ""
Write-Host "To preview the build, run: npm run preview" -ForegroundColor Cyan
