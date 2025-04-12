[![Deploy to GitHub Pages](https://github.com/PhyberApex/slds-json-schema-renderer/actions/workflows/deploy.yml/badge.svg)](https://github.com/PhyberApex/slds-json-schema-renderer/actions/workflows/deploy.yml)
[![Release](https://github.com/PhyberApex/slds-json-schema-renderer/actions/workflows/release.yml/badge.svg)](https://github.com/PhyberApex/slds-json-schema-renderer/actions/workflows/release.yml)

# SLDS JSON Schema Renderer

A CLI tool that generates beautiful, interactive documentation from JSON schema files. The tool parses your JSON schemas and creates a static HTML site powered by Vue.js and the Salesforce Lightning Design System (SLDS). [Demo](https://phyberapex.github.io/slds-json-schema-renderer/)

## Features

- **Schema Parsing**: Automatically parses and validates JSON schema files
- **SLDS Styling**: Professional look and feel using Salesforce Lightning Design System
- **Vue.js Frontend**: Modern, component-based interface with Vue 3
- **Static Output**: Generate completely static HTML that can be hosted anywhere
- **CLI Tool**: Easy to use from the command line or as part of your build process
- **Direct Icon Usage**: Uses SLDS icons directly as SVG file for better performance

## Installation

```bash
# Install globally
npm install -g slds-json-schema-renderer

# Or install locally in your project
npm install --save-dev slds-json-schema-renderer
```

## Usage

### Basic Usage

```bash
# Generate documentation from JSON schemas
json-schema-docs generate -i ./schemas -o ./docs
```

### Command Options

```
Usage: json-schema-docs generate [options]

Generate documentation from JSON schema files

Options:
  -i, --input <directory>      Input directory containing JSON schema files (default: "./schemas")
  -o, --output <directory>     Output directory for the generated documentation (default: "./docs")
  -t, --title <title>          Documentation title (default: "JSON Schema Documentation")
  -d, --description <description>  Documentation description (default: "")
  -v, --verbose                Enable verbose output (default: false)
  -h, --help                   Display help for command
```

### Examples

Generate documentation with a custom title and description:

```bash
json-schema-docs generate -i ./schemas -o ./docs -t "API Documentation" -d "Documentation for our REST API endpoints"
```

## Development

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/slds-json-schema-renderer.git
cd slds-json-schema-renderer

# Install dependencies
npm install

# Link for local development
npm link
```

### Development Workflow

```bash
# Start the Vue development server (with hot reloading)
npm run dev

# Build the frontend only
npm run build:frontend

# Build the CLI code only
npm run build:cli

# Build everything
npm run build
```

### Project Structure

```
slds-json-schema-renderer/
├── bin/                      # CLI executable
│   └── cli.js
├── src/                      # All source code
│   ├── frontend/            # Vue.js frontend application
│   │   ├── components/      # Vue components
│   │   ├── assets/          # Static assets
│   │   └── index.js         # Frontend entry point
│   └── templates/           # HTML templates
└── lib/                      # Compiled code (generated)
```

## License

MIT

## Author

PhyberApex
