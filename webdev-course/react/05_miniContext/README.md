# React Context API Project

A React application demonstrating the use of the Context API for state management. This project implements a user authentication flow with context providers and consumer components.

## Features
- State management using React Context API
- Context provider for global user state
- Component composition with context consumers
- Simple login and profile display

## Technologies Used
- React.js
- Context API (`createContext`, `useContext`)

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project folder:
   ```sh
   cd 05_miniContext
   ```
3. Install dependencies:
   ```sh
   npm i
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
1. Enter a username in the login form.
2. View the user profile displaying the entered username.

## Learning Outcomes
This project was built while learning React Context API and provided hands-on experience with:
- Creating a context using `createContext` for global state
- Providing state via `Context.Provider` to child components
- Consuming context using the `useContext` hook
- Structuring a React project with a context-based architecture

## Project Structure
```
05_miniContext/
├── node_modules/      # Dependencies
├── src/               # Source code
│   ├── components/    # UI components
│   │    ├── Login.jsx     # Login form component
│   │    └── Profile.jsx   # Profile display component
│   ├── context/       # Context API setup
│   │    ├── UserContext.js         # Context definition
│   │    └── UserContextProvider.jsx # Context provider component
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Entry point
│   ├── index.css      # Global styles
└── package.json       # Project metadata and dependencies
```

## License
This project is open-source and available under the MIT License.

