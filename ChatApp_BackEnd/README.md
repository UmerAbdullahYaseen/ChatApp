----------------------------------------------
Chat Application (BackEnd)
----------------------------------------------
Dependencies:
-Express.js
-Node.js
-MongoDB Database
-JWT
-mongoose

# Project Name

MessageBoard ChatApp
----------------------------------------------
How to Use it
----------------------------------------------
1- You can use the Database either through installation or cloud version MongoDB Atlas.
2- You need to clone the repository and move to the prject directory.
3- Now, install all dependencies using "npm install".
4- For connecting to database, you have install it using "npm install mongoose".
5- You can start the application's server and check the connection either using "node server.js" or "nodemon server".

# Project Name

Brief description of your project.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation
1. Clone the repository:
    ```bash
    git@github.com:UmerAbdullahYaseen/ChatApp.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ChatApp_Backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Configuration
- Create a `.env` file in the root directory of the project.
- Add the following environment variables to the `.env` file:
    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
  Replace `your_mongodb_connection_string` with your MongoDB connection string and `your_jwt_secret_key` with your JWT secret key.

## Usage
- To run the server, use the following command:
    ```bash
    node server.js
    ```
  The server will start listening on the specified port (default is 3001). You can now access the API endpoints.

## Endpoints
- `/api/auth/register`: POST request to register a new user.
- `/api/auth/login`: POST request to authenticate a user and generate a JWT token.
- Etc.

# Database Models

## User Model
- username: String (required, unique)
- email: String (required, unique)
- password: String (required)
- isUserOnline: Boolean (default: false)
- timestamp: Date (default: Date.now)

## Channel Model
- name: String (required, unique)
- description: String (required)
- timestamp: Date (default: Date.now)

## Message Model
- channelId: ObjectId (ref: 'Channel', required)
- userId: ObjectId (ref: 'User', required)
- message: String (required)
- lastMessage: String (default: '')
- timestamp: Date (default: Date.now)

# Controllers

## Auth Controller
- register: Handles user registration.
- login: Handles user authentication and JWT token generation.

## Channel Controller
- createChannel: Handles the creation of new channels.
- getChannels: Retrieves a list of all channels.

## Message Controller
- sendMessage: Handles the sending of messages to a channel.
- getMessages: Retrieves messages for a specific channel.

# Routes

- `/api/auth/register` -> `authController.register`
- `/api/auth/login` -> `authController.login`
- `/api/channels/create` -> `channelController.createChannel`
- `/api/channels` -> `channelController.getChannels`
- `/api/messages/send` -> `messageController.sendMessage`
- `/api/messages/:channelId` -> `messageController.getMessages`

## Contributing
- If you would like to contribute to the project, feel free to fork the repository and submit a pull request.

## License
- License Name (e.g., MIT License)
