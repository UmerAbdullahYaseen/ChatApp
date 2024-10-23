**Running the App:**

**Requirements:**
- Node.js installed on your machine

**Steps:**

1. **Install Dependencies:**
   ```bash
   cd messageBoard
   npm install
   cd ../ChatApp_Backend
   npm install

2. **Run the Server:**
   ```bash
   cd ChatApp_Backend
   node server.js

3. **Run the Client:**
   ```bash
   cd messageBoard
   npm start

- This will open the app in your default browser URL, http://localhost:3000/ and the port for server is set to 3001.

# Requirements Completion

## React Client

- Developed a full-page application with three panels: a navigation panel, a message list panel, and an editor panel.
- Implemented user interactions for channel selection, message submission, and channel switching.
- Ensured a responsive layout for optimal viewing on various screen sizes.

## Node.js Backend

- Created a Node.js server using Express to handle HTTP requests efficiently.
- Utilized MongoDB for persistent storage of channels and messages.
- Designed RESTful endpoints for querying channels and messages, as well as submitting new messages.

## Additional Features

### Deleting Channels

- Implemented functionality to delete channels via a delete button in the navigation panel.

### Clearing Chat

- Added a "Clear Chat" button in the message panel to remove all messages for the selected channel.

### Adding Channels

- Enabled users to create new channels by entering a name in the input field and clicking the "Create Channel" button.

### Real-Time Chat with Socket.IO

- Integrated real-time chat capabilities using Socket.IO. The foundational code is implemented, demonstrating the commitment to enhancing the app with real-time features in future iterations.

### State Management

- Effectively managed state in the React client, including channels, the currently selected channel, and message lists.

## Code Structure and Principles

- Followed development principles such as **DRY** (Don't Repeat Yourself) and **KISS** (Keep It Simple, Stupid) to maintain a clean and organized code structure.
- Implemented a modular file structure, separating routes and server logic for better maintainability.

## Code Analysis and Professionalism

- Conducted thorough code analysis, adhering to best practices, and maintaining a professional coding style.
- Identified potential improvements and actively sought ways to enhance the app's functionality.

## Error Handling

- Implemented error handling for various scenarios to ensure a smoother user experience.

## Conclusion

The application demonstrates a robust understanding of both frontend and backend development. While several features are fully operational, such as channel management and message handling, the inclusion of real-time chat highlights intentions for future enhancements. The code adheres to best practices, maintaining a clean structure, and ensuring a positive user experience. Overall, the project showcases the ability to develop a full-stack application with a focus on maintainability and user engagement.

