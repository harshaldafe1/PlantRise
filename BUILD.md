# Build Documentation

This project includes multiple build configurations to support different environments and workflows.

## Quick Start

### Using npm scripts (Recommended)
```bash
# Development
npm run dev          # Start development server

# Production build
npm run build        # Build for production
npm run preview      # Preview production build

# Development build
npm run build:dev    # Build with development mode

# Quality checks
npm run lint         # Run ESLint
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
```

## Build Files

### 1. **build.sh** (Linux/Mac/Git Bash)
Comprehensive build script for Unix-like systems.

**Usage:**
```bash
chmod +x build.sh    # Make executable (first time only)
./build.sh           # Run the build
```

**What it does:**
- Checks and installs dependencies if needed
- Runs linter
- Runs tests
- Builds the project
- Reports build size and output

### 2. **build.ps1** (Windows PowerShell)
PowerShell build script for Windows systems.

**Usage:**
```powershell
.\build.ps1
```

**What it does:**
- Checks and installs dependencies if needed
- Runs linter
- Runs tests
- Builds the project
- Reports build size and output

### 3. **Makefile** (Cross-platform with Make)
Traditional Makefile for developers familiar with Make.

**Usage:**
```bash
make help        # Show all available commands
make install     # Install dependencies
make dev         # Start development server
make build       # Build for production
make lint        # Run linter
make test        # Run tests
make clean       # Clean build artifacts
make all         # Full pipeline: install, lint, test, build
```

**Requirements:** Make must be installed on your system.

### 4. **GitHub Actions Workflow** (.github/workflows/build.yml)
Automated CI/CD pipeline for GitHub repositories.

**Features:**
- Runs on push to main/develop branches
- Runs on pull requests
- Tests on Node.js 18.x and 20.x
- Runs linter, tests, and build
- Uploads build artifacts
- Reports build size

**Automatic:** Runs automatically when code is pushed to GitHub.

## Build Output

All build commands create a `dist/` directory containing:
- `index.html` - Main HTML file
- `assets/` - Compiled JavaScript, CSS, and other assets
- Static files from `public/` directory

## Build Modes

### Production Build
```bash
npm run build
```
- Minified code
- Optimized for performance
- Source maps for debugging
- Tree-shaking to remove unused code

### Development Build
```bash
npm run build:dev
```
- Faster build time
- More readable output
- Better debugging experience

## Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
VITE_API_URL=https://api.example.com
VITE_FIREBASE_API_KEY=your_api_key
# Add other environment variables as needed
```

**Note:** Only variables prefixed with `VITE_` are exposed to the client-side code.

## Troubleshooting

### Build fails with "out of memory"
Increase Node.js memory limit:
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Dependencies issues
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Linting errors
Auto-fix common issues:
```bash
npm run lint -- --fix
```

### Test failures
Run tests in watch mode for debugging:
```bash
npm run test:watch
```

## Deployment

After building, deploy the `dist/` directory to your hosting provider:

- **Vercel:** `vercel --prod`
- **Netlify:** `netlify deploy --prod --dir=dist`
- **GitHub Pages:** Push `dist/` to `gh-pages` branch
- **Static hosting:** Upload `dist/` contents to your server

## Performance Optimization

The build process includes:
- Code splitting for optimal loading
- Asset optimization (images, fonts)
- CSS minification
- JavaScript minification and tree-shaking
- Gzip compression support

## Build Size Analysis

To analyze bundle size:
```bash
npm run build
# Check the output for size information
```

For detailed analysis, consider adding:
```bash
npm install --save-dev rollup-plugin-visualizer
```

## Support

For issues or questions:
1. Check the [Vite documentation](https://vitejs.dev/)
2. Review project-specific configuration in `vite.config.ts`
3. Check GitHub Actions logs for CI/CD issues
