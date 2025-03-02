# React Theme Switcher Project

A React application demonstrating the use of the Context API to implement a dynamic theme switcher. This project allows users to toggle between light and dark themes.

## Features
- Theme switching using React Context API
- Persistent theme state with `useState`
- Dynamic CSS class updates for theme changes
- Modular component-based architecture

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
   cd 06_themeSwitcher
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
1. Use the toggle button to switch between light and dark themes.
2. Observe the application updating the UI dynamically based on the selected theme.

## Learning Outcomes
This project was built while learning the React Context API and provided hands-on experience with:
- Creating and using context for global state management
- Implementing a theme switcher with `useState` and context
- Dynamically updating DOM classes using the `useEffect` hook
- Structuring a React project with a context-driven architecture

## Project Structure
```
06_themeSwitcher/
├── node_modules/      # Dependencies
├── public/            # Static files (index.html, favicon, etc.)
├── src/               # Source code
│   ├── components/    # UI components
│   │    ├── Card.jsx      # Content card component
│   │    └── ThemeBtn.jsx  # Theme toggle button component
│   ├── context/       # Context API setup
│   │    └── Theme.js      # Theme context definition
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Entry point
│   ├── index.css      # Global styles
└── package.json       # Project metadata and dependencies
```

## License
This project is open-source and available under the MIT License.

