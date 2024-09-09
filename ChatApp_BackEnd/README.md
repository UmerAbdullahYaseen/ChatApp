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

# Controllers

## Authentication Controller (authController.js)

### Methods

- **register**:  
  Handles user registration by creating a new user account. It validates input data, checks for existing users, hashes the password, and saves the user to the database.

- **login**:  
  Authenticates a user by verifying their credentials (email and password). If valid, it generates a token for session management.

- **allusers**:  
  Retrieves and returns a list of all registered users in the system. It may include filtering or pagination.

- **forgotPassword**:  
  Manages password recovery by sending a password reset link to the user's registered email address.

- **resetPassword**:  
  Updates a user's password based on a provided reset token and new password.

- **deleteUser**:  
  Deletes a specified user from the database, ensuring proper authentication before performing the action.

- **getUser**:  
  Retrieves detailed information about a specific user by their user ID, ensuring the requester is authenticated.

## Channel Controller (channelController.js)

### Methods

- **createChannel**:  
  Creates a new channel in the application. It validates the input data and associates the channel with the authenticated user.

- **getChannels**:  
  Retrieves and returns a list of all channels available in the application for the authenticated user.

- **getChannelDetails**:  
  Fetches detailed information about a specific channel using its channel ID.

- **updateChannel**:  
  Updates the details of a specific channel, such as its name or description, based on the channel ID.

- **deleteChannel**:  
  Deletes a specific channel by its ID, ensuring that the user is authenticated and authorized to perform this action.

## Message Controller (messageController.js)

### Methods

- **sendMessage**:  
  Sends a message to a specific channel, validating input data and ensuring the user is authenticated.

- **getMessages**:  
  Retrieves and returns all messages within a specific channel, filtering by the channel ID.

- **deleteMessages**:  
  Deletes a specific message from a channel based on its message ID, ensuring the requester is authenticated.

- **clearChannelMessages**:  
  Deletes all messages within a specific channel, requiring user authentication.

- **getMessage**:  
  Retrieves a specific message from a channel using its message ID.


# Routes

# API Routes

## Authentication Routes

| Method | Endpoint                      | Description                          | Authentication Required |
|--------|-------------------------------|--------------------------------------|-------------------------|
| POST   | `/api/auth/users`             | `authController.register`            | No                      |
| GET    | `/api/auth/users`             | `authController.allusers`            | No                      |
| POST   | `/api/auth/login`             | `authController.login`               | No                      |
| GET    | `/api/auth/users/:userId`     | `authController.getUser`             | Yes                     |
| DELETE | `/api/auth/users/:userId`     | `authController.deleteUser`          | Yes                     |

## Channel Routes

| Method | Endpoint                       | Description                           | Authentication Required |
|--------|--------------------------------|---------------------------------------|-------------------------|
| GET    | `/api/channels`                | `channelController.getChannels`       | Yes                     |
| POST   | `/api/channels`                | `channelController.createChannel`     | Yes                     |
| GET    | `/api/channels/:channelId`     | `channelController.getChannelDetails` | Yes                     |
| PUT    | `/api/channels/:channelId`     | `channelController.updateChannel`     | Yes                     |
| DELETE | `/api/channels/:channelId`     | `channelController.deleteChannel`     | Yes                     |

## Message Routes

| Method | Endpoint                                      | Description                            | Authentication Required |
|--------|-----------------------------------------------|----------------------------------------|-------------------------|
| GET    | `/api/channels/:channelId/messages`         | `messageController.getMessages`        | Yes                     |
| POST   | `/api/channels/:channelId/messages`         | `messageController.sendMessage`        | Yes                     |
| DELETE | `/api/channels/:channelId/messages/:messageId` | `messageController.deleteMessages`     | Yes                     |
| DELETE | `/api/channels/:channelId/messages`         | `messageController.clearChannelMessages` | Yes                     |
| GET    | `/api/channels/:channelId/messages/:messageId` | `messageController.getMessage`        | Yes                     |


## Contributing
- If you would like to contribute to the project, feel free to fork the repository and submit a pull request.

## License
- License Name (e.g., MIT License)
