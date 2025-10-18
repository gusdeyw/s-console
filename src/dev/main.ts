// Development entry point
import "uno.css";
import "virtual:unocss-devtools";
import { sconsole } from "../sconsole.ts";

// Initialize console with default options
let currentTheme: "light" | "dark" | "colorful" = "light";
const consoleInstance = new sconsole("console-container", {
  fontSize: "16px",
  fontFamily: "Arial",
  theme: currentTheme,
});

// Set initial theme class
document.documentElement.classList.add("light");

// Add built-in demo commands
consoleInstance.addCommand("time", () => {
  consoleInstance.appendToConsole(
    `Current time: ${new Date().toLocaleString()}`
  );
});

consoleInstance.addCommand("hello", () => {
  consoleInstance.appendToConsole("Hello from S-Console! 👋");
});

consoleInstance.addCommand("test", () => {
  consoleInstance.appendToConsole("Test command executed successfully! ✅");
});

consoleInstance.addCommand("demo", () => {
  consoleInstance.appendToConsole("This is a live demo of S-Console library");
  consoleInstance.appendToConsole(
    'Try typing "help" to see all available commands'
  );
});

consoleInstance.addCommand("github", () => {
  consoleInstance.appendToConsole(
    "Visit: https://github.com/gusdeyw/s-console"
  );
});

// Welcome message
setTimeout(() => {
  consoleInstance.appendToConsole("🎉 Welcome to S-Console Demo!");
  consoleInstance.appendToConsole(
    'Type "help" to see available commands or "demo" for more info'
  );
}, 500);

// Theme toggle functionality
// Theme toggle functionality
const toggleThemeButton = document.getElementById("toggleTheme");

if (toggleThemeButton) {
  // Available themes in order
  const themes = ["light", "dark", "colorful"] as const;
  let themeIndex = 0;

  toggleThemeButton.addEventListener("click", () => {
    // Cycle through 3 themes
    themeIndex = (themeIndex + 1) % themes.length;
    currentTheme = themes[themeIndex];

    // Update console theme
    consoleInstance.updateOptions({ theme: currentTheme });

    // Update button text and console feedback
    toggleThemeButton.textContent = `Theme: ${currentTheme}`;
    consoleInstance.appendToConsole(`🎨 Switched to ${currentTheme} theme`);
  });

  // Initial label
  toggleThemeButton.textContent = `Theme: ${currentTheme}`;
}

// === 🧱 Drag & Resize Toggle Buttons ===
const dragToggle = document.getElementById("dragToggle");
const resizeToggle = document.getElementById("resizeToggle");

let isDraggable = true;
let isResizable = true;

// 🧲 Toggle draggable feature
if (dragToggle) {
  dragToggle.addEventListener("click", () => {
    isDraggable = !isDraggable;
    consoleInstance.toggleDraggable(isDraggable);

    dragToggle.textContent = isDraggable ? "Drag: On" : "Drag: Off";
    dragToggle.classList.toggle("bg-blue-600", isDraggable);
    dragToggle.classList.toggle("bg-gray-800", !isDraggable);
  });
  dragToggle.textContent = "Drag: On";
}

// 📏 Toggle resizable feature
if (resizeToggle) {
  resizeToggle.addEventListener("click", () => {
    isResizable = !isResizable;
    consoleInstance.toggleResizable(isResizable);

    resizeToggle.textContent = isResizable ? "Resize: On" : "Resize: Off";
    resizeToggle.classList.toggle("bg-blue-600", isResizable);
    resizeToggle.classList.toggle("bg-gray-800", !isResizable);
  });
  resizeToggle.textContent = "Resize: On";
}




// Handle form submission for adding new commands
const form = document.getElementById("commandForm") as HTMLFormElement;
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyInput = document.getElementById("commandKey") as HTMLInputElement;
  const outputInput = document.getElementById(
    "commandOutput"
  ) as HTMLInputElement;

  const key = keyInput.value.trim();
  const output = outputInput.value.trim();

  if (key && output) {
    consoleInstance.addCommand(key, () => {
      consoleInstance.appendToConsole(output);
    });

    consoleInstance.appendToConsole(`✅ Command "${key}" added successfully!`);
    keyInput.value = "";
    outputInput.value = "";
  } else {
    alert("Please enter both command name and output.");
  }
  outputInput.value = "";
  
});


