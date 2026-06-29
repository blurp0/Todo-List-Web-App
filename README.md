# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:
# 📝 To-Do List App (CLI + Web)

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D%2020-brightgreen.svg)
![React Version](https://img.shields.io/badge/React-19-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Welcome to the **To-Do List App**, an open-source, dual-interface productivity tool built by **The To-Do List Core Team**. This project offers both a lightning-fast CLI for terminal power users and a beautiful, modern React-based Web UI for visual task management.

Both interfaces seamlessly share the exact same local JSON store, meaning you can add a task in the terminal and instantly check it off in the browser.

## 🚀 Features

- **Dual Interfaces:** Choose between a robust Command-Line Interface or a stunning Glassmorphic Web UI.
- **Shared Local State:** Zero cloud dependencies. All data is saved instantly to your local machine (`data/tasks.json`), shared between the CLI and the Web backend.
- **Modern Tech Stack:** Built with Node.js (v20+), Express, React 19, and Vite.
- **Test-Driven:** Comprehensive unit tests for our core services using Node's native test runner.

## 📦 Installation

To get started with the project locally, ensure you have **Node.js 20+** installed.

```bash
# Clone the repository
git clone https://github.com/your-org/to-do-list-cli.git
cd to-do-list-cli

# Install dependencies
npm install

# Link the CLI globally (Optional but recommended)
npm link
```

## 💻 Usage

### 1. Command-Line Interface (CLI)

If you ran `npm link`, you can simply run `todo` anywhere in your terminal. Otherwise, use `npm run todo --`.

```bash
todo add "Buy groceries"
todo list --all
todo done <id>
todo undo <id>
todo delete <id>
todo clear
```

### 2. Web Interface (React + Express)

To run the beautiful web application, use our concurrent dev script which starts both the Express API and the Vite React app.

```bash
npm run dev
```

Then, open your browser and navigate to `http://localhost:5173`.

## 🏗️ Architecture

The application is structured into clearly separated layers:
- **CLI Layer (`src/cli/`)**: Commander-based parser.
- **Web Layer (`web/src/`)**: React UI with custom hooks for state management.
- **API Layer (`server/`)**: Express REST API bridging the web and shared core.
- **Service Layer (`src/services/`)**: The shared business logic core (`TaskService`).
- **Storage Layer (`src/storage/`)**: Local persistence handler with automatic corruption recovery.

For an in-depth look at our technical decisions and phase planning, please read the [Architecture Document](./ARCHITECTURE.md).

## 🧪 Testing

We use the native `node:test` runner. To run the unit test suite:

```bash
npm test
```

## 🤝 Contributing

We welcome contributions from the community! Whether you want to add due dates, categories, or a dark mode toggle, we'd love to see your PR.

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct, branching strategy, and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
