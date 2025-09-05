// Development entry point
import 'uno.css';
import 'virtual:unocss-devtools';
import { sconsole } from '../sconsole.ts';

// Initialize the console for development
const console = new sconsole('console-container');

// Add some default commands for testing
console.addCommand('help', () => {
    console.appendToConsole('Available commands: help, time, hello, test');
});

console.addCommand('time', () => {
    console.appendToConsole(new Date().toLocaleString());
});

console.addCommand('hello', () => {
    console.appendToConsole('Hello from S-Console!');
});

console.addCommand('test', () => {
    console.appendToConsole('Test command executed successfully!');
});

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

// Make console available globally for debugging
(window as any).sConsole = console;
