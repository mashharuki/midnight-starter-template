# Serena Memory for MESH - Midnight Starter Template

## Project Overview

This project is a starter template for building decentralized applications (dApps) on the Midnight Network. It features a React-based frontend, a smart contract, and a command-line interface (CLI) for interacting with the contract. The project is structured as a monorepo using npm workspaces and Turbo.

## Project Structure

The project is a monorepo with the following main workspaces:

-   `frontend-vite-react`: The React frontend of the dApp, built with Vite. It provides the user interface for interacting with the smart contract.
-   `counter-contract`: The smart contract for the dApp. It is written in a language that compiles with the `compact` tool.
-   `counter-cli`: A command-line interface for developers to interact with the smart contract.
-   `bulletin-board`: Another contract, likely for a bulletin board feature.
-   `bulletin-board-cli`: A CLI for the bulletin board contract.

## Key Technologies

-   **Blockchain:** Midnight Network
-   **Smart Contract Language:** A language compiled with the `compact` tool.
-   **Frontend:** React, Vite, TypeScript
-   **Styling:** Tailwind CSS, Radix UI, Lucide React
-   **Monorepo Management:** npm Workspaces, Turbo
-   **Testing:** Vitest, Testcontainers
-   **CLI:** TypeScript, Node.js

## Build and Development

The project uses `turbo` to manage the monorepo. The most important scripts in the root `package.json` are:

-   `npm run build`: Builds all the workspaces.
-   `npm run test`: Runs tests for all the workspaces.
-   `npm run lint`: Lints all the workspaces.
-   `npm run start-app-testnet`: Starts the application in Testnet mode. This runs the proof server and the frontend development server concurrently.
-   `npm run start-app-undeployed`: Starts the application in local (undeployed) mode. This runs the frontend development server.
-   `npm run dev:undeployed-instances`: Prepares the local development environment.

## Deployment and Configuration

The application can be configured to run on different networks:

-   **Testnet:**
    -   Set the network ID to `NetworkId.TestNet` in `frontend-vite-react/src/App.tsx`.
    -   Configure the contract address in the same file.
-   **Undeployed/Local:**
    -   Set the network ID to `NetworkId.Undeployed` in `frontend-vite-react/src/App.tsx`.
    -   Configure your wallet address in `counter-cli/src/scripts/prepare-standalone.test.ts`.
    -   Deploy a new contract and use its address in the frontend.

## Core Components

### Smart Contracts (`counter-contract`, `bulletin-board`)

-   The smart contracts are written in a language that is compiled with the `compact` tool. The source files have a `.compact` extension.
-   The compilation output, including the contract keys and ZKIR (Zero-Knowledge Intermediate Representation), is stored in the `src/managed` directory within the contract workspace.
-   The `build` script for the contract workspace copies these artifacts to the `dist` directory.

### CLI (`counter-cli`, `bulletin-board-cli`)

-   The CLIs are written in TypeScript and are used to interact with the smart contracts from the command line.
-   They depend on the corresponding contract packages.
-   They include scripts for starting proof servers, preparing standalone environments, and running tests against different networks.

### Frontend (`frontend-vite-react`)

-   The frontend is a React application built with Vite.
-   It uses `@meshsdk/midnight-react` to interact with the Midnight network.
-   The `build` script for the frontend copies the contract keys and ZKIR files from the `counter-contract` workspace to the `public` directory, making them available to the frontend at runtime.
-   The frontend is responsible for connecting to the user's wallet, reading data from the contract, and sending transactions to the contract.
