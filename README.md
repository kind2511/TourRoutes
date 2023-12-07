# TurRuter

Welcome to TurRuter! This project is developed by group5 for PROG2052 at NTNU.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Local Setup](#local-setup)
3. [Running the Application](#running-the-application)
4. [Credits](#credits)

## Project Structure

The TurRuter project is organized into frontend and backend components:

- **frontend/**: Contains the React frontend code, which is the user interface.
- **backend/**: Manages the backend, including API, database connections, and server-side tasks.

Root directory files:
- `.gitignore`: For untracked files and folders.
- `README.md`: This document, explaining the project setup and guidelines.

## Getting Started

### Prerequisites

Before beginning, make sure you have installed:
- Node.js
- npm (Node Package Manager)
- Visual Studio Code (or any other preferred IDE)

### Local Setup

1. **Clone the Repository**:
    ```
    git clone https://gitlab.stud.idi.ntnu.no/omotayol/group5-prog2052.git
    ```
    Navigate to the project directory:
    ```
    cd group5-prog2052/turorienteringapp 
    ```

2. **Frontend Setup**:
    - Open Visual Studio Code and open the cloned project directory group5-prog2052.
    - Open a terminal in Visual Studio Code.
    - Navigate to the frontend directory:
      ```
      cd turorienteringapp/frontend 
      ```
    - Install the required dependencies:
      ```
      npm install
      ```
    - Start the frontend server:
      ```
      npm start
      ```

3. **Backend Setup**:
    - Open a new terminal tab in Visual Studio Code.
    - Navigate to the backend directory:
      ```
      cd turorienteringapp/backend
      ```
    - Install necessary dependencies:
      ```
      npm install
      ```
    - Create a `config.env` file in the backend directory and fill in the necessary configurations with this form 
    - After talking with the professor we were advised not to include this file in the git repo.

      <!-- Placeholder for future configuration details -->

    - Start the backend server:
      ```
      npm start
      ```



## Credits

Developed by:
1. Christopher Andreas Kindlien
2. Ahmad Masoud Mzafar
3. Omotayo Farouk Lawal
