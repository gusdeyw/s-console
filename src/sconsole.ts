// sConsole.ts
// Main class for s-console library

export class sconsole {
    private container: HTMLElement | null = null;
    private inputField: HTMLInputElement | null = null;
    private consoleArea: HTMLElement | null = null;
    private commands: Map<string, () => void> = new Map();

    constructor(containerId?: string) {
        if (containerId) {
            this.container = document.getElementById(containerId);
        }
        this.init();
    }

    private init() {
        this.createConsole();
        this.setupEventListeners();
    }

    private createConsole() {
        const consoleHtml = `
            <div class=":uno: p-5">
                <div class=":uno: rounded-lg border-2 border-solid border-#1e1e1e">
                    <div class=":uno: text-gray-700 text-sm font-bold my-2 px-3 flex justify-between">
                        <label>Console</label>
                        <div>
                            <svg class="close-button :uno: bg-#1e1e1e cursor-pointer p-1 text-white rounded-md" width="20" height="20" viewBox="0 0 20 20">
                                <path d="M 3 17 L 17 3 M 3 3 L 17 17" stroke="white" stroke-width="2" fill="none" />
                            </svg>
                        </div>
                    </div>
                    <div class=":uno: bg-#1e1e1e h-56 overflow-y-auto w-full text-white p-3" id="consoleParent">
                        <div class=":uno: bg-#1e1e1e w-full" id="consoleOutput"></div>
                        <div class=":uno: flex">
                            <p class=":uno: text-white">User> </p>
                            <input id="consoleInput" class=":uno: bg-#1e1e1e focus:outline-none w-full text-white" type="text">
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (this.container) {
            this.container.innerHTML = consoleHtml;
        } else {
            // Create container if none provided
            const div = document.createElement('div');
            div.innerHTML = consoleHtml;
            document.body.appendChild(div);
            this.container = div;
        }

        // Get references to elements
        this.inputField = this.container.querySelector('#consoleInput') as HTMLInputElement;
        this.consoleArea = this.container.querySelector('#consoleOutput') as HTMLElement;
    }

    private setupEventListeners() {
        if (!this.inputField || !this.consoleArea) return;

        const closeButton = this.container?.querySelector('.close-button');
        const parent = this.container?.querySelector('#consoleParent');

        // Close button
        closeButton?.addEventListener('click', () => {
            this.clear();
        });

        // Focus on click
        parent?.addEventListener('click', () => {
            this.inputField?.focus();
        });

        // Handle input
        this.inputField.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.handleInput(this.inputField!.value);
            }
        });
    }

    private handleInput(input: string) {
        if (input === 'clear') {
            this.clear();
            return;
        }

        this.appendToConsole(`User> ${input}`);

        if (this.commands.has(input)) {
            const command = this.commands.get(input)!;
            command();
        } else {
            this.appendToConsole(`<span class=":uno: text-red-500">Unknown command: ${input}</span>`);
        }

        this.inputField!.value = '';
        this.scrollToBottom();
    }

    public addCommand(key: string, callback: () => void) {
        this.commands.set(key, callback);
    }

    public appendToConsole(message: string) {
        if (this.consoleArea) {
            this.consoleArea.innerHTML += `<p>${message}</p>`;
        }
    }

    public clear() {
        if (this.consoleArea) {
            this.consoleArea.innerHTML = '';
        }
        if (this.inputField) {
            this.inputField.value = '';
        }
    }

    private scrollToBottom() {
        const parent = this.container?.querySelector('#consoleParent') as HTMLElement;
        if (parent) {
            parent.scrollTop = parent.scrollHeight;
        }
    }
}
