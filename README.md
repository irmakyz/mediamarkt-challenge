# GitHub Issues Browser

## 🚀 Project Overview

This project is a **GitHub Issues Browser** that allows users to:

- View a list of GitHub issues.
- Search and filter issues by state (open, closed, all).
- View details of a single issue along with its comments.

## 📦 Getting Started

### Install Dependencies

Before starting the project, install the required dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

## 📂 Project Structure

- src/pages/index.tsx: Main page to view and filter GitHub issues.
- src/pages/issue/[issueNumber].tsx: Page to view details of a single issue and its comments.
- src/components/: Contains reusable UI components.
- src/services/: Contains services for fetching data from the GitHub API.
- src/utils/: Utility functions used across the project.
- src/styles/: Styling files for the project.
- src/types/: TypeScript types used in the project.

## Features

- ✅ View GitHub issues from a repository.
- 🔎 Search and filter issues by state.
- 📄 View issue details, including comments.
- 📜 Pagination for better browsing experience.

## 🛠 Tech Stack

- Next.js - React framework for production.
- TypeScript - Strongly typed JavaScript for better development.
- Apollo Client - GraphQL client for fetching GitHub issues.
- React Query - Data fetching and caching.
- Styled Components - CSS-in-JS styling.
- Cypress - End-to-End testing.

## 📝 Environment Variables
To run this project, you need to set up a .env.local file with the following:

```bash
GITHUB_ACCESS_TOKEN=your_personal_access_token
```
## ✅ Running Tests
Run unit tests with:

```bash
npm test
```
Run Cypress end-to-end tests:

```bash
npm run e2e
```

## Rendering Strategy: SSR & Client-Side Rendering

This project leverages a **hybrid rendering approach** using **Server-Side Rendering (SSR)** for initial page loads and **Client-Side Rendering (CSR)** for interactive user actions.

### **Server-Side Rendering (SSR) for Initial Loads**
- Used for loading the **issues list** and **issue details** on first page visit.
- Implemented using **Next.js `getServerSideProps`**.
- Ensures **faster initial page load times**, **better SEO**, and **content availability for web crawlers**.

✅ **Benefits of SSR:**
- 🚀 **Faster first paint and page load times.**
- 🔎 **SEO optimization** by delivering pre-rendered content to search engines.
- 📊 **Improves performance** on slow network connections.

### **Client-Side Rendering (CSR) for User Interactions**
- Used for **searching issues, pagination, and loading more comments**.
- Implemented using **Apollo Client + React Query** for efficient GraphQL fetching.
- Allows a **smooth and interactive experience** without full-page reloads.

✅ **Benefits of CSR:**
- ⚡ **Faster user interactions** without waiting for a full page reload.
- 🔄 **Dynamic updates** without the need for server requests on each interaction.
- 🎯 **Reduces server load** by fetching only what’s needed in real-time.

By combining **SSR for initial rendering** and **CSR for user interactions**, the app achieves **fast initial loads, good SEO, and a smooth user experience**. 🚀
