# To-Do List App (CLI + Web)

![Node Version](https://img.shields.io/badge/node-%3E%3D%2020-brightgreen.svg)
![React Version](https://img.shields.io/badge/React-19-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Welcome to the **To-Do List App**, an open-source, dual-interface productivity tool built by the To-Do List Core Team. This project offers a Command-Line Interface (CLI) and a React-based Web UI for task management.

Both interfaces share the same local JSON store, meaning you can add a task in the terminal and check it off in the browser.

## Features

- **Dual Interfaces:** Choose between a Command-Line Interface or a Web UI.
- **Shared Local State:** All data is saved to your local machine (`data/tasks.json`), shared between the CLI and the Web backend.
- **Test-Driven:** Unit tests for core services using Node's native test runner.

## Tech Stack

This project was built using modern tools to ensure speed and maintainability:

- **Frontend:** [React 19](https://react.dev/), [Vite](https://vitejs.dev/), CSS Modules
- **Backend (API):** [Node.js](https://nodejs.org/) (v20+), [Express](https://expressjs.com/)
- **CLI Framework:** [Commander](https://github.com/tj/commander.js/)
- **Styling:** Custom CSS with Glassmorphism, Google Fonts (*Outfit*, *Inter*)
- **Storage:** Local JSON file persistence
- **Testing:** Node.js native test runner (`node:test`)

## Installation

To get started with the project locally, ensure you have **Node.js 20+** installed.

```bash
# Clone the repository
git clone https://github.com/your-org/to-do-list-cli.git
cd to-do-list-cli

# Install dependencies
npm install

# Link the CLI globally (Optional)
npm link
```

## Usage

### 1. Command-Line Interface (CLI)

If you ran `npm link`, you can run `todo` anywhere in your terminal. Otherwise, use `npm run todo --`.

```bash
todo add "Buy groceries"
todo list --all
todo done <id>
todo undo <id>
todo delete <id>
todo clear
```

### 2. Web Interface (React + Express)

To run the web application, use our concurrent dev script which starts both the Express API and the Vite React app.

```bash
npm run dev
```

Then, open your browser and navigate to `http://localhost:5173`.

## Architecture

The application is structured into clearly separated layers:
- **CLI Layer (`src/cli/`)**: Commander-based parser.
- **Web Layer (`web/src/`)**: React UI with custom hooks for state management.
- **API Layer (`server/`)**: Express REST API bridging the web and shared core.
- **Service Layer (`src/services/`)**: The shared business logic core (`TaskService`).
- **Storage Layer (`src/storage/`)**: Local persistence handler with automatic corruption recovery.

For an in-depth look at our technical decisions and phase planning, please read the [Architecture Document](./ARCHITECTURE.md).

## Testing

We use the native `node:test` runner. To run the unit test suite:

```bash
npm test
```

## Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct, branching strategy, and the process for submitting pull requests.

## Video Preview

https://github.com/user-attachments/assets/5f6eac97-aa3f-47a4-bf8a-64eb3d5318e7
