# S-Console

A lightweight, customizable JavaScript console library for web applications. Built with TypeScript and styled with UnoCSS.

<p align="center">
  <img src="./public/v1_screenshot.png" alt="S-Console Screenshot" />
</p>

## Features

- 🎨 Customizable appearance (font size, font family, themes)
- ⌨️ Built-in commands (help, clear, font adjustment)
- 🔧 Easy command creation and management
- 🌐 Global window access for debugging
- 📦 Multiple build formats (ESM, CJS, UMD, IIFE)
- 🎯 TypeScript support with full type definitions

## Tech Stack

- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **UnoCSS** - Utility-first CSS framework
- **HTML Templates** - Dynamic UI generation

## Installation

### Build from Source (Recommended)
```bash
# Clone the repository
git clone https://github.com/gusdeyw/s-console.git
cd s-console

# Install dependencies
npm install

# Build the library
npm run build

# Use the files from dist/ folder
# - dist/s-console.es.js (ES Module)
# - dist/s-console.cjs.js (CommonJS)
# - dist/s-console.umd.js (UMD)
# - dist/s-console.iife.js (IIFE for browser)
# - dist/style.css (Styles)
```

### Direct Usage
```html
<!-- Copy built files to your project and include them -->
<link rel="stylesheet" href="./dist/style.css">
<script src="./dist/s-console.iife.js"></script>

<!-- Or use ES modules -->
<script type="module">
import { sconsole } from './dist/s-console.es.js';
</script>
```

## Quick Start

### 1. HTML Setup
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="path/to/s-console/style.css">
</head>
<body>
    <div id="my-console"></div>
    <script src="path/to/s-console.js"></script>
</body>
</html>
```

### 2. JavaScript Initialization
```javascript
// Basic initialization
const console = new sconsole('my-console');

// With custom options
const console = new sconsole('my-console', {
    fontSize: '16px',
    fontFamily: 'Arial',
    theme: 'dark'
});
```

## API Reference

### Constructor

```typescript
new sconsole(containerId?: string, options?: Partial<ConsoleOptions>)
```

**Parameters:**
- `containerId` (optional): HTML element ID where console will be mounted
- `options` (optional): Configuration options

### ConsoleOptions Interface

```typescript
interface ConsoleOptions {
    fontSize: string;     // Default: '14px'
    fontFamily: string;   // Default: 'monospace'
    theme: string;        // Default: 'dark'
}
```

### Methods

#### `addCommand(key: string, callback: () => void)`
Add a custom command to the console.

```javascript
console.addCommand('hello', () => {
    console.appendToConsole('Hello, World!');
});
```

#### `appendToConsole(message: string)`
Add a message to the console output.

```javascript
console.appendToConsole('This is a message');
console.appendToConsole('<span style="color: red;">HTML message</span>');
```

#### `updateOptions(options: Partial<ConsoleOptions>)`
Update console options dynamically.

```javascript
console.updateOptions({
    fontSize: '18px',
    fontFamily: 'Courier New'
});
```

#### `clear()`
Clear the console output and input field.

```javascript
console.clear();
```

### Built-in Commands

The console comes with several built-in commands:

- `help` - List all available commands
- `clear` - Clear console output
- `options` - Show current configuration

## Usage Examples

### Basic Command Setup
```javascript
// Initialize console
const myConsole = new sconsole('console-container');

// Add custom commands
myConsole.addCommand('time', () => {
    myConsole.appendToConsole(new Date().toLocaleString());
});

myConsole.addCommand('random', () => {
    const num = Math.floor(Math.random() * 100);
    myConsole.appendToConsole(`Random number: ${num}`);
});

myConsole.addCommand('info', () => {
    myConsole.appendToConsole('S-Console v1.0.0');
    myConsole.appendToConsole('Built with TypeScript and UnoCSS');
});
```

### Advanced Example with Custom Styling
```javascript
// Custom styled console
const styledConsole = new sconsole('styled-console', {
    fontSize: '16px',
    fontFamily: 'Fira Code, monospace',
    theme: 'dark'
});

// Add command with formatted output
styledConsole.addCommand('status', () => {
    styledConsole.appendToConsole('<span style="color: green;">✓ System Online</span>');
    styledConsole.appendToConsole('<span style="color: blue;">ℹ Memory Usage: 45%</span>');
    styledConsole.appendToConsole('<span style="color: orange;">⚠ 3 Warnings</span>');
});

// Dynamic font adjustment
styledConsole.addCommand('bigtext', () => {
    styledConsole.updateOptions({ fontSize: '20px' });
});
```

### Integration with Existing Applications
```javascript
// Global access for debugging
window.debugConsole = new sconsole('debug-panel');

// Add application-specific commands
debugConsole.addCommand('reset', () => {
    // Your app reset logic
    localStorage.clear();
    debugConsole.appendToConsole('Application reset complete');
});

debugConsole.addCommand('version', () => {
    debugConsole.appendToConsole(`App Version: ${APP_VERSION}`);
});
```

## TypeScript Support

S-Console is built with TypeScript and provides full type definitions:

```typescript
import { sconsole } from 's-console';
import type { ConsoleOptions } from 's-console/types';

const options: ConsoleOptions = {
    fontSize: '14px',
    fontFamily: 'monospace',
    theme: 'dark'
};

const typedConsole = new sconsole('container', options);
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ support required
- CSS Grid and Flexbox support required

## License

MIT License - see LICENSE file for details.