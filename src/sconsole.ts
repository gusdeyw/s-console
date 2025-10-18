// sConsole.ts
// Main class for s-console library

import type { ConsoleOptions } from "./types/core";

export class sconsole {
  private container: HTMLElement | null = null;
  private inputField: HTMLInputElement | null = null;
  private consoleArea: HTMLElement | null = null;
  private commands: Map<string, () => void> = new Map();
  private commandHistory: string[] = [];
  private historyIndex: number = -1;
  private currentInput: string = "";
  private draggableEnabled = true;
private resizableEnabled = true;

// keep references to handlers so we can remove them later
private _dragHandlers: {
  pointerdown?: (e: PointerEvent) => void;
  pointermove?: (e: PointerEvent) => void;
  pointerup?: (e: PointerEvent) => void;
} = {};

  private options: ConsoleOptions = {
    fontSize: "14px",
    fontFamily: "monospace",
    theme: "dark",
  };

  constructor(containerId?: string, userOptions?: Partial<ConsoleOptions>) {
    if (containerId) {
      this.container = document.getElementById(containerId);
    }

    // Merge user options with defaults
    if (userOptions) {
      this.options = { ...this.options, ...userOptions };
    }

    this.init();
    this.setupDefaultCommands();

    // Make console available globally for debugging
    (window as any).sConsole = this;
  }

  private init() {
    this.createConsole();
    this.setupEventListeners();
  }

  private setupDefaultCommands() {
    // Built-in help command that lists all available commands
    this.addCommand("help", () => {
      const commandList = Array.from(this.commands.keys()).join(", ");
      this.appendToConsole(`Available commands: ${commandList}`);
    });

    // Built-in clear command
    this.addCommand("clear", () => {
      this.clear();
    });

    // Font size adjustment commands
    // this.addCommand('font+', () => {
    //     this.adjustFontSize(2);
    // });

    // this.addCommand('font-', () => {
    //     this.adjustFontSize(-2);
    // });

    // Show current options
    // this.addCommand('options', () => {
    //     this.appendToConsole(`Font Size: ${this.options.fontSize}`);
    //     this.appendToConsole(`Font Family: ${this.options.fontFamily}`);
    //     this.appendToConsole(`Theme: ${this.options.theme}`);
    // });
  }

  private createConsole() {
    const consoleHtml = `
        <div class="sconsole :uno: rounded-lg border-2 border-solid border-#1e1e1e">
            <div class=":uno: text-gray-700 text-sm font-bold my-2 px-3 flex justify-between">
                <label>Console</label>
                <div>
                    <svg class="close-button :uno: bg-#1e1e1e cursor-pointer p-1 text-white rounded-md" width="20" height="20" viewBox="0 0 20 20">
                        <path d="M 3 17 L 17 3 M 3 3 L 17 17" stroke="white" stroke-width="2" fill="none" />
                    </svg>
                </div>
            </div>
            <div class=":uno: console-body h-56 overflow-y-auto w-full p-3" id="consoleParent">
                <div class=":uno: w-full" id="consoleOutput"></div>
                <div class=":uno: flex">
                    <p class=":uno:">User> </p>
                    <input id="consoleInput" class=":uno: focus:outline-none w-full" type="text">
                </div>
            </div>
        </div>
    `;

    if (this.container) {
      this.container.innerHTML = consoleHtml;
    } else {
      const div = document.createElement("div");
      div.innerHTML = consoleHtml;
      document.body.appendChild(div);
      this.container = div;
    }

    this.inputField = this.container.querySelector(
      "#consoleInput"
    ) as HTMLInputElement;
    this.consoleArea = this.container.querySelector(
      "#consoleOutput"
    ) as HTMLElement;

    this.applyFontStyles();
    this.applyTheme(); // ⬅️ add this line
    if (this.draggableEnabled) this.makeDraggable();
    this.toggleResizable(this.resizableEnabled);
  }

  private applyTheme() {
    if (!this.container) return;

    const root = this.container.querySelector(".sconsole") as HTMLElement;
    const parent = this.container.querySelector(
      "#consoleParent"
    ) as HTMLElement;
    const input = this.container.querySelector(
      "#consoleInput"
    ) as HTMLInputElement;
    const label = this.container.querySelector("label") as HTMLElement;

    if (!root || !parent || !input || !label) return;

    // 🧠 Save current size before reset
    const currentWidth = root.style.width;
    const currentHeight = root.style.height;

    // 🧹 Reset inline styles
    [root, parent, input, label].forEach((el) => {
      el.removeAttribute("style");
    });

    // Remove old theme classes
    root.classList.remove(
      "sconsole-dark",
      "sconsole-light",
      "sconsole-colorful"
    );

    switch (this.options.theme) {
      case "dark":
        // 🌑 Dark theme
        root.classList.add("sconsole-dark");
        root.style.backgroundColor = "#f9f9f9";
        root.style.color = "white";

        parent.style.backgroundColor = "#1e1e1e";
        parent.style.color = "white";

        input.style.backgroundColor = "#1e1e1e";
        input.style.color = "white";

        label.style.color = "#1e1e1e";
        break;

      case "light":
        // 🌕 Light theme
        root.classList.add("sconsole-light");
        root.style.backgroundColor = "#1e1e1e";
        root.style.color = "white";

        parent.style.backgroundColor = "#f9f9f9";
        parent.style.color = "black";

        input.style.backgroundColor = "#f9f9f9";
        input.style.color = "black";

        label.style.color = "white";
        break;

      case "colorful":
        // 🌈 Colorful theme
        root.classList.add("sconsole-colorful");
        root.style.background =
          "linear-gradient(135deg, #ff7eb3, #ff758c, #ffcc70)";
        root.style.color = "white";
        root.style.borderColor = "#ffcc70";

        parent.style.background = "linear-gradient(135deg, #6a11cb, #2575fc)";
        parent.style.color = "white";

        input.style.backgroundColor = "rgba(255, 255, 255, 0)";
        input.style.color = "white";
        input.style.borderRadius = "4px";

        label.style.color = "#fff";
        label.style.textShadow = "0 1px 2px rgba(0,0,0,0.3)";
        break;
    }

    // ✅ Reapply saved size (keep user resize)
    if (currentWidth) root.style.width = currentWidth;
    if (currentHeight) root.style.height = currentHeight;
  }

  private makeDraggable() {
  const root = this.container?.querySelector(".sconsole") as HTMLElement | null;
  const header = this.container?.querySelector(
    ".sconsole > div:first-child"
  ) as HTMLElement | null;

  if (!root || !header) return;

  // ensure we don't attach multiple listener sets
  this.removeDragListeners();

  header.style.cursor = "move";

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let startX = 0;
  let startY = 0;
  let hasMoved = false;
  let isFloating = false;
  let placeholder: HTMLElement | null = null;

  const initialRect = root.getBoundingClientRect();
  const initialState = {
    width: initialRect.width,
    height: initialRect.height,
    marginTop: getComputedStyle(root).marginTop,
    marginLeft: getComputedStyle(root).marginLeft,
    left: initialRect.left + window.scrollX,
    top: initialRect.top + window.scrollY,
  };

  const onPointerDown = (e: PointerEvent) => {
    if (!this.draggableEnabled) return;
    if ((e as any).button !== undefined && (e as any).button !== 0) return;
    startX = e.clientX;
    startY = e.clientY;
    isDragging = true;
    hasMoved = false;
    (e.target as Element).setPointerCapture?.((e as PointerEvent).pointerId);
    document.body.style.userSelect = "none";
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!this.draggableEnabled || !isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!hasMoved && Math.abs(dx) < 3 && Math.abs(dy) < 3) return;

    if (!isFloating) {
      const rect = root.getBoundingClientRect();

placeholder = document.createElement("div");
placeholder.classList.add("sconsole-placeholder");
placeholder.style.width = `${rect.width}px`;
placeholder.style.height = `${rect.height}px`;
placeholder.style.display = getComputedStyle(root).display;
placeholder.style.margin = getComputedStyle(root).margin;
root.parentElement?.insertBefore(placeholder, root);


      // float above page while dragging
      root.style.position = "fixed";
      root.style.left = `${rect.left}px`;
      root.style.top = `${rect.top}px`;
      root.style.width = `${rect.width}px`;
      root.style.zIndex = "9999";
      root.style.margin = "0";

      document.body.appendChild(root);

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      isFloating = true;
    }

    hasMoved = true;

    // clamp inside viewport
    const maxX = window.innerWidth - root.offsetWidth;
    const maxY = window.innerHeight - root.offsetHeight;
    const newX = Math.max(0, Math.min(e.clientX - offsetX, maxX));
    const newY = Math.max(0, Math.min(e.clientY - offsetY, maxY));

    root.style.left = `${newX}px`;
    root.style.top = `${newY}px`;
  };

  const onPointerUp = (e: PointerEvent) => {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.userSelect = "";

    try {
      header.releasePointerCapture((e as PointerEvent).pointerId);
    } catch {}

    if (isFloating && placeholder && placeholder.parentElement) {
      const finalRect = root.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      // put it back into the DOM where the placeholder was, then make absolute
      placeholder.parentElement.insertBefore(root, placeholder);
      placeholder.remove();
      placeholder = null;
      isFloating = false;

      // set absolute position relative to document so it stays where dropped and scrolls naturally
      root.style.position = "absolute";
      root.style.left = `${finalRect.left + scrollX}px`;
      root.style.top = `${finalRect.top + scrollY}px`;
      root.style.width = `${finalRect.width}px`;
      root.style.zIndex = "9999";
      root.style.margin = "0";
    }
  };

  // store handlers so we can remove later
  this._dragHandlers.pointerdown = onPointerDown;
  this._dragHandlers.pointermove = onPointerMove;
  this._dragHandlers.pointerup = onPointerUp;

  header.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);

  // double click reset (safe to add once; it uses stored initial state)
header.addEventListener("dblclick", () => {
  root.style.transition = "all 0.25s ease";

  // If we had a placeholder, restore console into it
  const ph = document.querySelector(".sconsole-placeholder");
  if (ph && ph.parentElement) {
    ph.parentElement.insertBefore(root, ph);
    ph.remove();
  }

  // Reset back to document flow
  root.style.position = "static";
  root.style.left = "";
  root.style.top = "";
  root.style.width = "";
  root.style.height = "";
  root.style.marginTop = initialState.marginTop;
  root.style.marginLeft = initialState.marginLeft;
  root.style.zIndex = "";

  setTimeout(() => {
    root.style.transition = "";
  }, 250);
});

  }
  
  private removeDragListeners() {
  const header = this.container?.querySelector(".sconsole > div:first-child") as HTMLElement | null;
  if (!header) return;

  // remove stored handlers if present
  if (this._dragHandlers.pointerdown) {
    header.removeEventListener("pointerdown", this._dragHandlers.pointerdown);
  }
  if (this._dragHandlers.pointermove) {
    document.removeEventListener("pointermove", this._dragHandlers.pointermove);
  }
  if (this._dragHandlers.pointerup) {
    document.removeEventListener("pointerup", this._dragHandlers.pointerup);
  }

  // clear references
  this._dragHandlers = {};
  header.style.cursor = "default";
}




  private applyFontStyles() {
    if (this.consoleArea) {
      this.consoleArea.style.fontSize = this.options.fontSize;
      this.consoleArea.style.fontFamily = this.options.fontFamily;
    }
    if (this.inputField) {
      this.inputField.style.fontSize = this.options.fontSize;
      this.inputField.style.fontFamily = this.options.fontFamily;
    }
  }

  // private adjustFontSize(change: number) {
  //     const currentSize = parseInt(this.options.fontSize);
  //     const newSize = Math.max(8, Math.min(32, currentSize + change)); // Min 8px, Max 32px
  //     this.options.fontSize = `${newSize}px`;
  //     this.applyFontStyles();
  //     this.appendToConsole(`Font size changed to: ${this.options.fontSize}`);
  // }

  private setupEventListeners() {
    if (!this.inputField || !this.consoleArea) return;

    const closeButton = this.container?.querySelector(".close-button");
    const parent = this.container?.querySelector("#consoleParent");

    // Close button
    closeButton?.addEventListener("click", () => {
      this.clear();
    });

    // Focus on click
    parent?.addEventListener("click", () => {
      this.inputField?.focus();
    });

    // Handle input, command history, and keyboard shortcuts
    this.inputField.addEventListener("keydown", (event) => {
      // Keyboard shortcuts
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") {
        event.preventDefault();
        this.clear();
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        this.inputField!.value = "";
        return;
      }
      if (event.key === "Escape") {
        this.inputField!.blur();
        return;
      }
      if (event.key === "Enter" && this.inputField!.value.trim()) {
        event.preventDefault();
        const input = this.inputField!.value.trim();
        this.appendToConsole(`User> ${input}`);

        // Add command to history if not empty and not duplicate of last command
        if (
          input &&
          (this.commandHistory.length === 0 ||
            this.commandHistory[this.commandHistory.length - 1] !== input)
        ) {
          this.commandHistory.push(input);
        }

        // Reset history index
        this.historyIndex = -1;
        this.currentInput = "";

        // Execute command
        if (this.commands.has(input)) {
          const command = this.commands.get(input)!;
          command();
        } else {
          this.appendToConsole(
            `<span class=":uno: text-red-500">Unknown command: ${input}</span>`
          );
        }

        this.inputField!.value = "";
        this.scrollToBottom();
        return;
      }

      // History navigation
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (this.historyIndex === -1) {
          this.currentInput = this.inputField!.value;
        }
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          this.inputField!.value =
            this.commandHistory[
              this.commandHistory.length - 1 - this.historyIndex
            ];
        }
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (this.historyIndex > -1) {
          this.historyIndex--;
          if (this.historyIndex === -1) {
            this.inputField!.value = this.currentInput;
          } else {
            this.inputField!.value =
              this.commandHistory[
                this.commandHistory.length - 1 - this.historyIndex
              ];
          }
        }
      }
    });
  }

  public addCommand(key: string, callback: () => void) {
    this.commands.set(key, callback);
  }

  public updateOptions(newOptions: Partial<ConsoleOptions>) {
    this.options = { ...this.options, ...newOptions };
    this.applyFontStyles();
    if (newOptions.theme) this.applyTheme(); // ⬅️ Re-apply theme dynamically
    this.appendToConsole(`Options updated`);
  }

  public appendToConsole(message: string) {
    if (this.consoleArea) {
      this.consoleArea.innerHTML += `<p>${message}</p>`;
    }
  }

  public clear() {
    if (this.consoleArea) {
      this.consoleArea.innerHTML = "";
    }
    if (this.inputField) {
      this.inputField.value = "";
    }
    // Reset history index and current input but keep command history
    this.historyIndex = -1;
    this.currentInput = "";
  }

  private scrollToBottom() {
    const parent = this.container?.querySelector(
      "#consoleParent"
    ) as HTMLElement;
    if (parent) {
      parent.scrollTop = parent.scrollHeight;
    }
  }

public toggleDraggable(enabled?: boolean) {
  if (typeof enabled === "boolean") this.draggableEnabled = enabled;
  else this.draggableEnabled = !this.draggableEnabled;

  if (this.draggableEnabled) {
    // reattach listeners (guarded inside makeDraggable)
    this.makeDraggable();
  } else {
    // remove only drag listeners; keep pointer events so resize still works
    this.removeDragListeners();
  }
}

public toggleResizable(enabled?: boolean) {
  if (typeof enabled === "boolean") this.resizableEnabled = enabled;
  else this.resizableEnabled = !this.resizableEnabled;

  const root = this.container?.querySelector(".sconsole") as HTMLElement | null;
  if (!root) return;

  root.style.resize = this.resizableEnabled ? "both" : "none";
}


}
