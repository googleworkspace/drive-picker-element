# Google Drive Picker Elements and Components

## Overview

This repository contains the source code for the Google Drive Picker web component and its framework specific wrappers.

## Project Structure

- `packages/drive-picker-element`: The core web component written in TypeScript.

Additional framework specific wrappers are available in the `packages` directory with samples in the `examples` directory.

## Development

The project uses `pnpm` for package management and `turbo` for monorepo management.

- `pnpm install`: Install dependencies.
- `pnpm build`: Build all packages.
- `pnpm dev`: Start the development server.
- `pnpm format`: Format the code.
- `pnpm lint`: Lint the code.
- `pnpm check`: Check the code.
- `pnpm test`: Run tests.

- Always run `pnpm format lint check test build` after making changes.
