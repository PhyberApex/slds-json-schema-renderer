[![Checks](https://github.com/PhyberApex/slds-json-schema-renderer/actions/workflows/checks.yml/badge.svg)](https://github.com/PhyberApex/slds-json-schema-renderer/actions/workflows/checks.yml)
[![npm](https://img.shields.io/npm/v/slds-json-schema-renderer)](https://www.npmjs.com/package/slds-json-schema-renderer)

# SLDS JSON Schema Renderer

A CLI tool that generates interactive documentation from JSON Schema files. It parses your schemas, resolves their `$ref`s and produces a static HTML site powered by Vue 3 and the Salesforce Lightning Design System (SLDS). [Live demo](https://phyberapex.github.io/slds-json-schema-renderer/)

## Features

- **Schema parsing and validation**: every schema is validated against the metaschema it declares in `$schema` (draft-06, draft-07, 2019-09 or 2020-12; draft-07 by default). Violations are reported as warnings, or as errors with `--strict`.
- **`$ref` resolution**: references are resolved relative to the schema file that contains them, so schemas can be split across files and folders. Recursive references are detected and shown as a "recursive reference" badge instead of being expanded forever.
- **Broad keyword coverage**: objects, arrays, primitives, type arrays such as `["string", "null"]`, boolean subschemas, `enum` / `const`, `anyOf` / `oneOf` / `allOf` next to other keywords, `not`, `if` / `then` / `else`, `dependencies`, `propertyNames`, `format`, `default`, `examples` and the usual constraints.
- **Visual and raw views**: every schema (and every nested subschema) can be switched between the visual rendering and the fully resolved JSON.
- **Static output**: a single `index.html` plus `assets/bundle.js` and `assets/bundle.css` that can be hosted on any static file server.
- **SLDS styling**: a familiar Lightning look and feel, with the SLDS icons inlined into the bundle.

## Installation

```bash
# Run without installing
npx slds-json-schema-renderer generate -i ./schemas -o ./docs

# Install globally
npm install -g slds-json-schema-renderer

# Or install locally in your project
npm install --save-dev slds-json-schema-renderer
```

Node.js 20 or newer is required.

## Usage

```bash
slds-json-schema-renderer generate -i ./schemas -o ./docs
```

### Command options

```
Usage: slds-json-schema-renderer generate [options]

Generate documentation from JSON schema files

Options:
  -i, --input <directory>          Input directory containing JSON schema files
                                   (default: "./schemas")
  -o, --output <directory>         Output directory for the generated
                                   documentation (default: "./docs")
  -t, --title <title>              Documentation title (default: "JSON Schema
                                   Documentation")
  -d, --description <description>  Documentation description (default: "")
  -v, --verbose                    Enable verbose output (default: false)
  --strict                         Fail on schemas that do not match their JSON
                                   Schema metaschema (default: false)
  -h, --help                       display help for command
```

The title is used for the page header and the HTML `<title>`; the description fills the footer and the `<meta name="description">` tag.

### Example

```bash
slds-json-schema-renderer generate \
  -i ./schemas \
  -o ./docs \
  -t "API Documentation" \
  -d "Documentation for our REST API payloads" \
  --strict
```

### How input files are treated

- **Every `*.json` file** below the input directory (except under `node_modules`) is treated as a schema and gets its own entry in the sidebar. This includes files that are only referenced from other schemas. Keep shared fragments in a separate directory if you do not want them listed.
- Files that are not JSON objects (`null`, arrays, numbers, strings) are reported and skipped. A JSON object without `$schema` or `type` is still included, with a warning.
- **Relative `$ref`s** such as `"$ref": "./common/address.json#/definitions/street"` are resolved relative to the file that contains them. Remote (`http`) references are not fetched.
- **Recursive schemas** (for example a tree whose children are the same schema) are supported. The back-reference is kept as `{ "$ref": "#/...", "_circular": true }` in the resolved JSON and rendered as a badge.
- Each schema's sidebar label is its `title`, falling back to the file name.

### Exit codes

The command exits with a non-zero code when the output could not be written (for example when the frontend bundle is missing from the installation) and, with `--strict`, when any schema fails to parse or violates its metaschema.

## Development

### Prerequisites

- Node.js 20 or newer (CI runs on Node 24)
- npm

### Setup

```bash
git clone https://github.com/PhyberApex/slds-json-schema-renderer.git
cd slds-json-schema-renderer
npm install
```

### Scripts

```bash
npm run dev            # Vite dev server with the fixtures from test/ as mock data
npm run build          # Babel (CLI) + Vite (frontend) into lib/
npm start -- generate -i ./test -o ./docs   # run the built CLI against the fixtures
npm test               # unit and component tests (Vitest)
npm run test:smoke     # generate from the fixtures and load the built page in jsdom
npm run test:coverage  # tests with coverage
npm run lint           # ESLint
```

### Project structure

```
slds-json-schema-renderer/
├── bin/cli.js               # CLI entry point (commander)
├── src/
│   ├── cli/                 # generate command
│   ├── utils/
│   │   ├── schema-parser.js # file discovery, metaschema validation, $ref resolution
│   │   └── html-generator.js# template filling and asset copying
│   ├── templates/index.html # HTML template for the generated site
│   └── frontend/            # Vue 3 application bundled into lib/frontend
│       ├── components/      # layout and schema components
│       └── utils/           # type inference, literal formatting, component registry
├── test/                    # JSON Schema fixtures used by the demo and the smoke test
├── tests/                   # Vitest suites (unit, frontend, smoke)
├── prepareMockData.js       # turns test/ into mock data for the dev server
└── lib/                     # build output (generated)
```

## License

MIT

## Author

PhyberApex
