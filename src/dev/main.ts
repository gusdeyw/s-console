// Development entry point
import 'uno.css';
import 'virtual:unocss-devtools';
import { sconsole } from '../sconsole.ts';

// Example 1: Initialize console with default options
// const console = new sconsole('console-container');

// Example 2: Initialize console with custom options
const console = new sconsole('console-container', {
    fontSize: '16px',
    fontFamily: 'Arial',
    theme: 'light'
});

// Add some example commands for testing
console.addCommand('time', () => {
    console.appendToConsole(new Date().toLocaleString());
});

console.addCommand('hello', () => {
    console.appendToConsole('Hello from S-Console!');
});

console.addCommand('test', () => {
    console.appendToConsole('Test command executed successfully!');
});

// Example 3: Add a command that uses updateOptions
// console.addCommand('bigfont', () => {
//     console.updateOptions({ fontSize: '18px', fontFamily: 'Arial' });
// });

// console.addCommand('smallfont', () => {
//     console.updateOptions({ fontSize: '12px', fontFamily: 'monospace' });
// });

// Example 4: Show available built-in commands
console.appendToConsole('Welcome! Try these commands:');
console.appendToConsole('• help - Show all commands');

// Handle form submission for adding new commands
const form = document.getElementById('commandForm') as HTMLFormElement;
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const keyInput = document.getElementById('commandKey') as HTMLInputElement;
    const outputInput = document.getElementById('commandOutput') as HTMLInputElement;

    const key = keyInput.value;
    const output = outputInput.value;

    console.addCommand(key, () => {
        console.appendToConsole(output);
    });

    alert('Command added successfully!');
    keyInput.value = '';
    outputInput.value = '';
});
