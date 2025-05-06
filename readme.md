# 🎲 Real-time Tic Tac Toe

This project is a classic **Tic Tac Toe (Noughts and Crosses)** game designed for **two players** to compete against each other online in **real-time**.

It allows players to **invite a friend to a match using a unique shareable link**.

## 🌐 Live Demo

You can play the game live here: [https://tictactoeorigin.web.app/](https://tictactoeorigin.web.app/)

<img width="1440" alt="image" src="https://github.com/user-attachments/assets/04cefd72-2f02-4bb7-a096-a3c8764389cd" />


## ✨ My Learning Journey

This application holds a special place as it represents my **first significant project built using Node.js and Socket.io**.

## 🎮 How to Play

1.  Go to the [Live Demo link](https://tictactoeorigin.web.app/).
2.  Please **wait briefly for the server to initialize** (it's hosted on a free tier, which might cause a short initial delay).
3.  **Type your desired nickname** and click the **"Stwórz pokój" (Create Room) button**.
4.  A unique game room will be created. **Copy the URL** by clicking the "Zaproś" (Invate) button.
5.  **Share this URL with your friend.**
6.  When your friend opens the link, they will automatically **join your game room**, and the match will begin!

## 🛠️ Technologies Used

*   **React:** For building the interactive front-end user interface.
*   **Styled Components:** For writing clean and component-scoped CSS styles.
*   **Node.js:** The back-end JavaScript runtime environment.
*   **Express:** A minimal and flexible Node.js web application framework.
*   **Socket.io:** For enabling real-time, bidirectional communication between the client and server (WebSockets).

## 🚀 How to Run Locally (For Developers)

To set up and run the project on your local machine:

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    ```
2.  Navigate into the project directory:
    ```bash
    cd <your-repo-directory>
    ```
3.  **Install dependencies** for both the client and server:

    *   **Client:**
        ```bash
        cd client
        yarn install # or npm install
        ```
    *   **Server:**
        ```bash
        cd ../server # Go back to the root, then into server
        yarn install # or npm install
        ```
4.  **Start the Server:**
    *   Open a new terminal window.
    *   Navigate to the `server` directory:
        ```bash
        cd <your-repo-directory>/server
        ```
    *   Run the development server:
        ```bash
        yarn dev # or npm run dev (check your package.json script)
        ```
5.  **Start the Client:**
    *   Open *another* new terminal window.
    *   Navigate to the `client` directory:
        ```bash
        cd <your-repo-directory>/client
        ```
    *   Run the client development server:
        ```bash
        yarn start # or npm start
        ```

The client application should open in your browser, typically at `http://localhost:3000`. You can then share this `localhost:3000` URL with someone else on the *same network* to test the two-player functionality, or open it in another browser tab/window yourself.
