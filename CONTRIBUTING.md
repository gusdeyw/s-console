# 🤝 Contributing to S-Console

Thank you for your interest in contributing to **S-Console**!  
This guide will help you get started, follow coding standards, and submit meaningful contributions efficiently.

---

## 🚀 Getting Started

### Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (v16 or higher) – [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** – [Download here](https://git-scm.com/)
- A code editor (VS Code recommended)

---

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/s-console.git
   cd s-console
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   This will start a local development server where you can test your changes.

4. **Build the project**
   ```bash
   npm run build
   ```

## 📋 Project Structure

```
s-console/
├── src/
│   ├── sconsole.ts          # Main library class
│   ├── index.ts             # Library entry point
│   ├── dev/                 # Development files
│   │   ├── index.html       # Development HTML
│   │   └── main.ts          # Development JavaScript
│   └── types/
│       └── core.ts          # TypeScript type definitions
├── dist/                    # Built files (auto-generated)
├── public/                  # Static assets
├── package.json             # Project configuration
├── tsconfig.json            # TypeScript configuration
├── uno.config.ts            # UnoCSS configuration
├── vite.config.ts           # Vite build configuration
└── README.md                # Project documentation
```

## 🎯 How to Contribute

Contributing to **S-Console** is easy and beginner-friendly! Follow these steps to get started.

### 1. Choose What to Work On

- Check the [TODO / Roadmap section in README.md](./README.md#todo---roadmap--improvements) for tasks that need attention.
- Browse [open issues](https://github.com/gusdeyw/s-console/issues) to find bugs or feature requests.
- Look for issues labeled:
  - `good first issue` – Perfect for newcomers
  - `help wanted` – Needs extra attention from contributors
- Have an idea for a new feature? **Open an issue first** to discuss it with the maintainers before starting your work.

💡 **Tip:** Start with smaller issues if you're new to the project. It’s a great way to understand the codebase and gain confidence before tackling bigger tasks.

### 2. Create a Branch

Before making any changes, create a new branch to keep your work organized and separate from the main branch:

```bash
# Create a new branch for a feature
git checkout -b feature/your-feature-name

# Create a new branch for a bug fix
git checkout -b fix/bug-description
```

### 3. Make Your Changes

Once your branch is ready, start implementing your changes. Keep the following guidelines in mind:

- ✨ **Write Clean Code**: Follow the project’s coding standards and best practices.
- 📝 **Comment Wisely**: Add comments for complex logic or any non-obvious code.
- 📚 **Update Documentation**: If your change affects usage or introduces new features, update README or relevant docs.
- ✅ **Test Thoroughly**: Ensure your changes work as expected. Test edge cases and validate that existing functionality is not broken.

💡 **Tip**: Commit small, logical chunks of work rather than one large commit. It makes code review easier and helps track changes.


### 4. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add command history navigation with up/down arrows"
```

#### Commit Message Guidelines

Use conventional commit format:

**Types:**
- `feat:`     ✨ Introduce a new feature
- `fix:`      🐛 Fix a bug
- `docs:`     📝 Documentation only changes
- `style:`    💄 Code style or formatting changes (no functional changes)
- `refactor:` 🔨 Code changes that neither fix a bug nor add a feature
- `test:`     ✅ Add or update tests
- `chore:`    🔧 Maintenance tasks (e.g., updating dependencies, build scripts)

**Example Commit Messages:**
- `feat(auth): add JWT login support`
- `fix(ui): resolve navbar overlapping issue`
- `docs: update contributing guidelines`
- `style: format code with prettier`
- `refactor(api): optimize request handler`
- `test: add unit tests for login function`
- `chore: upgrade Node.js to v18`

💡 **Tip:** Keep your summary under 50 characters and use imperative mood (“Add feature” not “Added feature”).


### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Reference any related issues
- Screenshots/GIFs for UI changes
- Testing instructions

## 🎨 Code Style & Standards

### TypeScript Guidelines

To maintain code quality and consistency across the project, please follow these TypeScript best practices:

- ✅ **Use TypeScript** for all new features and modules.
- ✅ **Define proper types and interfaces** for objects, function parameters, and return values.
- ✅ **Avoid using `any`** unless absolutely necessary. Prefer `unknown` or proper type definitions.
- ✅ **Use meaningful names** for variables, functions, and classes for readability.
- ✅ **Follow existing patterns** and project conventions for structure and code style.
- ✅ **Leverage strict type checking** (`strict: true` in `tsconfig.json`) for safer code.
- ✅ **Use enums or literal types** instead of magic strings or numbers when applicable.
- ✅ **Document complex types or interfaces** using JSDoc comments.
- ✅ **Keep functions small and focused**, returning typed values instead of `any`.

### Code Formatting

```typescript
// ✅ Good - descriptive names, proper typing
interface CommandOptions {
    description?: string;
    validation?: (input: string) => boolean;
    aliases?: string[];
}

public addCommand(name: string, callback: CommandCallback, options?: CommandOptions): void {
    // Implementation
}

// ❌ Avoid - unclear names, no typing
function add(n: any, c: any): any {
    // Implementation
}
```

### CSS / Styling Guidelines

To maintain a consistent look and feel across the project, follow these best practices:

- ✅ **Use UnoCSS utility classes** with the `:uno:` prefix for all new styles.
- ✅ **Follow the existing theme** for colors, fonts, and spacing to ensure consistency.
- ✅ **Make styles responsive** using mobile-first principles and responsive utility classes.
- ✅ **Use CSS custom properties** (`--variable-name`) for theme values to improve maintainability.
- ✅ **Avoid inline styles** unless absolutely necessary.
- ✅ **Group related classes logically** and keep class names descriptive for readability.
- ✅ **Test your styles** across different screen sizes and browsers whenever possible.

```html
<!-- ✅ Good - UnoCSS utilities -->
<div class=":uno: flex items-center justify-between p-4 bg-gray-800 rounded-lg">

<!-- ❌ Avoid - inline styles -->
<div style="display: flex; padding: 16px;">
```

## 🧪 Testing Guidelines

### 🧪 Manual Testing

Before submitting your pull request, ensure that your changes are thoroughly tested. Check the following:

- Basic console functionality (input, output, commands)
- Your specific changes work as expected without breaking existing features
- Compatibility across supported browsers (Chrome, Firefox, Safari)
- Mobile responsiveness and different screen sizes
- Proper handling of edge cases and error conditions

### ✅ Testing Checklist

- [ ] Console initializes correctly without errors
- [ ] Built-in commands function as intended (`help`, `clear`, etc.)
- [ ] Custom commands can be added, executed, and removed successfully
- [ ] Input handling works for valid and invalid entries
- [ ] Styling and layout render correctly across devices
- [ ] No console errors or warnings in browser developer tools
- [ ] Works with different container sizes and configurations
- [ ] All new features are tested manually and pass expected behavior

## 📝 Documentation

When contributing:

### Code Documentation
- Add JSDoc comments for public methods
- Document complex algorithms or business logic
- Update type definitions when changing interfaces

```typescript
/**
 * Adds a custom command to the console
 * @param name - The command name (must be unique)
 * @param callback - Function to execute when command is called
 * @param options - Optional configuration for the command
 * @example
 * ```typescript
 * console.addCommand('time', () => {
 *   console.appendToConsole(new Date().toString());
 * });
 * ```
 */
public addCommand(name: string, callback: CommandCallback, options?: CommandOptions): void {
    // Implementation
}
```

### README Updates
- Update examples if you change the API
- Add new features to the feature list
- Update installation instructions if needed

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Console error messages (if any)
- Code sample that demonstrates the issue

## 💡 Feature Requests

Before proposing new features:
- Check if it already exists in the TODO list
- Search existing issues to avoid duplicates
- Provide clear use case and benefits
- Consider backward compatibility

## 🔍 Code Review Process

### What We Look For
- Code follows project standards
- Changes are well-tested
- Documentation is updated
- No breaking changes (unless discussed)
- Performance considerations

### Review Timeline
- Initial review within 48-72 hours
- Follow-up reviews within 24 hours
- Maintainers will provide constructive feedback
- Address feedback promptly for faster merge

## 🚦 Release Process

1. **Development** → `main` branch
2. **Testing** → Automated and manual testing
3. **Documentation** → Update changelogs and docs
4. **Release** → Tagged releases with semantic versioning

## 🏷️ Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR** version for breaking changes
- **MINOR** version for new features
- **PATCH** version for bug fixes

## 📞 Getting Help

If you run into issues or need guidance, here’s how you can get support:

- **Check existing issues** – Someone might have already faced the same problem: [Issues](https://github.com/gusdeyw/s-console/issues)
- **Start a discussion** – Ask questions or share ideas with the community: [Discussions](https://github.com/gusdeyw/s-console/discussions)
- **Comment on your PR** – If you’re stuck on a specific change, mention it in your pull request for feedback from maintainers
- **Reach out on social/community channels** (if applicable) for real-time help

> 💡 Tip: Always provide clear details about the problem, error messages, and steps to reproduce it. This speeds up the help process!

## 🎉 Recognition

We love acknowledging our contributors! Your efforts will be recognized through:

- **GitHub contributors list** – Your profile will appear as a contributor
- **Changelog acknowledgments** – Notable contributions will be mentioned in release notes
- **Special mentions** – Significant improvements or features may get highlighted in the project README or community announcements
- **Community reputation** – Build credibility and connect with other developers through meaningful contributions

## ⚖️ License

By contributing to S-Console, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

**Happy coding! 🚀**

Thank you for helping make S-Console better for everyone!
