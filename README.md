# Data Processing Docker Project

## Overview
A Docker-based application for generating and parsing random data files.

## Project Structure
```
data-processing-project/
├── src/
│   ├── generate/
│   │   └── generateData.js
│   └── parser/
│       └── fileParser.js
├── Dockerfile
└── README.md
```

## Prerequisites
- Docker
- Node.js (optional, for local development)

## Installation

### Clone Repository
```bash
git clone https://github.com/ashrafali-v/file-parser.git
cd file-parser
```

### Build Docker Image
```bash
docker build -t  challenge-b-parser .
```

## Usage

### Run Container
```bash
docker run -v $(pwd)/output:/app/output challenge-b-parser
```

## Features
- Generates 10MB file with 4 random objects
- Parses and identifies object types
- Multi-stage Docker build
- Efficient stream processing

## Object Types
- Alphabetical strings
- Real numbers
- Integers
- Alphanumerics (with spaces)

## Troubleshooting
- Verify Docker installation
- Check file permissions
- Ensure sufficient system resources

## Performance
- 64KB buffer size
- Low memory footprint
- Stream-based processing
