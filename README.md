# TurOrienteringApp

Welcome to the TurOrienteringApp! This project is developed by Group5 for PROG2052 at NTNU.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Local Setup](#local-setup)
3. [Contributing](#contributing)


## Project Structure

Our project is divided into frontend and backend components:

- **frontend/**: Contains our React frontend code. This is the user-facing part of our application.
  
- **backend/**: Manages the back end of the application including the API, database connections, and other server-side tasks.

Root directory files:
- `.gitignore`: Lists files and folders we don't want Git to track.
- `README.md`: This very document!

## Getting Started

### Prerequisites

Before you start, make sure you have:
- Node.js
- npm (Node Package Manager)

### Local Setup

1. **Clone the Repository**:
    ```
    git clone https://gitlab.stud.idi.ntnu.no/omotayol/group5-prog2052.git
    cd group5-prog2052/turorienteringapp
    ```

2. **Frontend Setup**:
    - Go to the frontend directory:
      ```
      cd frontend
      ```
    - Install the dependencies:
      ```
      npm install
      ```
    - Start the React server:
      ```
      npm start
      ```

3. **Backend Setup**:
    - Switch to the backend directory:
      ```
      cd ../backend
      ```
    - Get the required dependencies:
      ```
      npm install
      ```
    - Start the backend server:
      ```
      npm start
      ```

## Contributing

Here's our collaborative workflow:

- Each developer will have their own branch for development.
- When adding a new feature or fixing something, make sure to work within your designated branch.
- Regularly pull the latest updates from the `main` branch to stay synced.
- Once frontend and backend integrations are complete and have been discussed by the group members, they can be merged into the respective branches.
- After thorough discussion and review of all changes, we can then push the consolidated updates to the `main` branch. 
