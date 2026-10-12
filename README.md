# React Ticket Triage Dashboard

A React and TypeScript application for viewing, searching, filtering, and updating customer support tickets.

## Features

- Fetch and display tickets from a REST API
- Search tickets by title or customer name
- Filter tickets by status
- View complete ticket details
- Update ticket status
- Reset search and status filters
- Select and deselect ticket cards
- Display selected ticket with a highlighted border
- Handle loading states
- Handle API errors
- Handle empty search results
- Responsive two-column dashboard layout
- TypeScript type safety
- Accessible form controls

## Tech Stack

- React
- TypeScript
- Vite
- Node.js
- Express.js
- REST API
- CSS

## Project Structure

```text
react-ticket-triage/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchFilter.tsx
│   │   │   ├── TicketList.tsx
│   │   │   └── TicketDetails.tsx
│   │   ├── App.tsx
│   │   ├── ticketDashboard.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── server/
│   ├── data/
│   │   └── tickets.json
│   ├── package.json
│   └── server.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Prerequisites

Before running the application, make sure the following are installed:

- Node.js 20.19 or later
- npm

## Installation

Clone the repository:

```bash
git clone https://github.com/Manisha1996-codes/react-ticket-triage.git
```

Go to the project directory:

```bash
cd react-ticket-triage
```

Install the dependencies:

```bash
npm install
```

## Run the Application

The backend and frontend must run in separate terminals.

### Start the API Server

Open the first terminal and run:

```bash
npm run dev:api
```

The API server runs on:

```text
http://localhost:3001
```

### Start the React Application

Open a second terminal and run:

```bash
npm run dev:web
```

Open the application in the browser:

```text
http://localhost:5173
```

## API Endpoints

### Health Check

```http
GET /api/health
```

Example response:

```json
{
  "ok": true
}
```

### Get All Tickets

```http
GET /api/tickets
```

This endpoint returns the list of available support tickets.

### Update Ticket Status

```http
PATCH /api/tickets/:id/status
```

Example endpoint:

```http
PATCH /api/tickets/T-101/status
```

Example request body:

```json
{
  "status": "Resolved"
}
```

Supported status values:

- Open
- In Progress
- Resolved

### Reset Ticket Data

```http
POST /api/reset
```

This endpoint restores the original ticket data.

## Application Flow

1. The dashboard loads and calls `GET /api/tickets`.
2. The returned tickets are stored in React state.
3. The tickets are displayed using the `TicketList` component.
4. Search and status filtering are performed on the client side.
5. Clicking a ticket displays its information in the details panel.
6. Clicking the selected ticket again removes the selection.
7. Changing a ticket status calls `PATCH /api/tickets/:id/status`.
8. The updated ticket is saved in React state and reflected in the UI.
9. Clicking the Reset button clears the search, status filter, and selected ticket.

## Component Overview

### SearchFilter

Responsible for:

- Searching by title or customer name
- Filtering tickets by status
- Resetting the filters
- Disabling the Reset button when no filters are applied

### TicketList

Responsible for:

- Displaying the filtered ticket list
- Selecting a ticket
- Highlighting the selected ticket
- Deselecting a ticket when clicked again
- Displaying the empty state

### TicketDetails

Responsible for:

- Displaying selected ticket information
- Closing the details panel
- Updating the ticket status
- Displaying update progress
- Displaying update errors

### TicketDashboard

Responsible for:

- Fetching ticket data
- Managing application state
- Filtering tickets
- Managing selected ticket state
- Updating ticket data after a successful API request
- Handling loading, error, and empty states

## Implemented Requirements

- [x] Fetch and display tickets
- [x] Search by ticket title or customer name
- [x] Filter by status
- [x] Select and view ticket details
- [x] Update ticket status using the API
- [x] Handle loading state
- [x] Handle API fetch errors
- [x] Handle status update errors
- [x] Handle empty search results
- [x] Use TypeScript types
- [x] Use reusable React components
- [x] Provide accessible controls
- [x] Reset filters
- [x] Toggle ticket selection

## Notes

Ticket updates are stored in memory by the backend. Restarting the API server resets the ticket data to its original state.

## Author

Manisha S