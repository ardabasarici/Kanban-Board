# Simple Kanban Board

A **kanban board** is one of the tools that can be used to implement **kanban** to manage work at a personal or organizational level.

## Prerequisites

- Node v16.13.1
- npm v8.1.2

## Installation

1. Run `npm install` command in the client and server directories to install dependencies.
2. Run `node index.js` command in the server directory to start the server.
3. Run `npm start` in the client directory.

Application is running on localhost port 3000 and port 5000. You can open the aplication in your browser on `http://localhost:3000`.

## Usage

Each board has an id. When you open the app, it start with a randomly generated id. Each changes on the board is saved to database. To reach a board with an certain id visit `localhost:3000/:boardId`, If there is no board with that id, an empty board will be created with that id. Recently visited pages is stored on your local storage, you can see on the right top corner up to 5 pages. If you didn't visit 5 pages, you can create new boards with those buttons also. when you hover on the quesion mark, it shows the board id, you can copy it to the clipboard by clicking for easy usage.
