export class Console {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  // Clears the console content
  clear(): void {
    this.container.innerHTML = '';
  }

  // Other existing methods...
}
