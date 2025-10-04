// Development entry point
import 'uno.css';
import 'virtual:unocss-devtools';
import { sconsole } from '../sconsole.ts';

// Initialize console with default options
let currentTheme: 'light' | 'dark' = 'dark';
const consoleInstance = new sconsole('console-container', {
    fontSize: '16px',
    fontFamily: 'Arial',
    theme: currentTheme
});

// Add built-in demo commands
consoleInstance.addCommand('time', () => {
    consoleInstance.appendToConsole(`Current time: ${new Date().toLocaleString()}`);
});

consoleInstance.addCommand('hello', () => {
    consoleInstance.appendToConsole('Hello from S-Console! 👋');
});

consoleInstance.addCommand('test', () => {
    consoleInstance.appendToConsole('Test command executed successfully! ✅');
});

consoleInstance.addCommand('demo', () => {
    consoleInstance.appendToConsole('This is a live demo of S-Console library');
    consoleInstance.appendToConsole('Try typing "help" to see all available commands');
});

consoleInstance.addCommand('github', () => {
    consoleInstance.appendToConsole('Visit: https://github.com/gusdeyw/s-console');
});

// Welcome message
setTimeout(() => {
    consoleInstance.appendToConsole('🎉 Welcome to S-Console Demo!');
    consoleInstance.appendToConsole('Type "help" to see available commands or "demo" for more info');
}, 500);

// Theme toggle functionality
const toggleThemeButton = document.getElementById('toggleTheme');
if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        consoleInstance.updateOptions({ theme: currentTheme });
        consoleInstance.appendToConsole(`Theme switched to ${currentTheme} mode`);
    });
}

// Handle form submission for adding new commands
const form = document.getElementById('commandForm') as HTMLFormElement;
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const keyInput = document.getElementById('commandKey') as HTMLInputElement;
    const outputInput = document.getElementById('commandOutput') as HTMLInputElement;

    const key = keyInput.value.trim();
    const output = outputInput.value.trim();

    if (key && output) {
        consoleInstance.addCommand(key, () => {
            consoleInstance.appendToConsole(output);
        });

        consoleInstance.appendToConsole(`✅ Command "${key}" added successfully!`);
        keyInput.value = '';
        outputInput.value = '';
    } else {
        alert('Please enter both command name and output.');
    }
    outputInput.value = '';
});
