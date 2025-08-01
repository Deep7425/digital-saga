# Digital Saga - Setup Instructions

## Quick Start Guide

Follow these simple steps to get your Digital Saga website running:

### 1. Extract the Project
Extract the digital-saga-project folder to your desired location.

### 2. Install Node.js
Make sure you have Node.js installed (version 16 or higher):
- Download from: https://nodejs.org/

### 3. Install Dependencies
Open a terminal in the project folder and run:
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

Your website will be available at: http://localhost:5173

### 5. Build for Production
To create a production build:
```bash
npm run build
```

The built files will be in the `dist` folder.

## File Structure Overview

- `client/src/pages/` - All website pages (Home, About, Services, Contact)
- `client/src/components/` - Reusable components (Navbar, Hero, Footer, etc.)
- `client/src/index.css` - All custom styles and animations
- `package.json` - Project dependencies and scripts

