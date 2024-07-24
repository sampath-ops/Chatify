# Chatify
Chatify is a real-time chat application built with React for the frontend and Express with Mongoose for the backend. This application allows users to sign up, set an avatar, and chat with their contacts in real-time using socket.io.

## Features
- User Authentication: Users can sign up, log in, and log out.
- Avatar Setup: Users can set a unique avatar using the Multiavatar API.
- Real-Time Chat: Users can chat with their contacts in real-time.
- Contact List: Users can view a list of contacts they can chat with.
## Technologies Used
### Frontend
- React
- socket.io-client
- Multiavatar API
### Backend
- Express
- Mongoose
- MongoDB
- socket io

## Project Structure
```
root
├── public                # Contains the React application
└── server                # Contains the Express application
```
## Installation
1. Clone the repository:
    ```
    git clone https://github.com/sampath-ops/Chatify.git
    cd chatify
    ```
2. Setup Environment Variables:
Create .env files in both the public and server directories based on the provided templates.
    **env.template for React:**
    ``` REACT_APP_LOCALHOST_KEY="chatify-current-user"
    REACT_APP_AVATAR_API_KEY=your_avatar_api_key 
    ```
    **env.template for Express:**
    ``` 
    MONGO_URL=mongodb+srv://username:<PASSWORD>@cluster0.hepcajb.mongodb.net/chatify?retryWrites=true&w=majority&appName=Cluster0
    PORT=3001
    DATABASE_PASSWORD=dbpassword
    ```