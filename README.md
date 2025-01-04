### QuickChat Frontend

This repository contains the frontend code for **QuickChat**, a real-time chatting application built using React. The frontend provides a user-friendly interface for engaging in group or private chats, displaying message statuses, user activity, and other key features.

---

## Features

- **Real-Time Messaging**: Communicate instantly in group or private chats.
- **Message Status Indicators**: Displays "Sent", "Delivered", and "Read" statuses.
- **User Status**: Shows online status and last seen information.
- **Typing Indicators**: Displays when a user is typing.
- **Offline Message Handling**: Messages are queued and displayed once the recipient comes online.
- **Optimized User Search**: Implements debouncing for efficient user retrieval.
- **Optimized Read Receipts**: Utilizes callback functions for efficient updates to read receipt statuses.

---

## Technologies Used

- **Framework**: React
- **State Management**: Local state and React Context 
- **Real-Time Communication**: Socket.IO client
- **Styling**: CSS
- **Storage**: Local storage for chat persistence

---

## Optimizations Implemented

### 1. **Debouncing for User Retrieval**
- To prevent excessive API calls while searching for users, debouncing is implemented.
- When typing in the user search bar, the application waits for a specified delay before triggering the API call to fetch user data.
- This improves performance and reduces server load.

### 2. **Optimized Read Receipts with Callbacks**
- Read receipt updates are handled using callback functions.
- This ensures efficient communication between components, preventing unnecessary re-renders and improving overall responsiveness.

---

## Setup Instructions

### Prerequisites
- Node.js installed
- A package manager like npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sagardubey14/quickchat-frontend.git
   cd quickchat-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the backend server URL:
   - Locate the configuration file (e.g., `.env`).
   - Set the backend server's URL (e.g., `http://localhost:3000`).

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the application in your browser at:
   ```
   http://localhost:5173
   ```

---

## Usage

1. Open the frontend in your browser.
2. Log in or enter a username (if required).
3. Start chatting in group chats or private messages.
4. View message delivery, read statuses, and real-time updates.

---

## Future Enhancements

- Improved UI/UX design.
- Notifications for new messages.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Explore the real-time messaging experience with **QuickChat Frontend**! 🚀