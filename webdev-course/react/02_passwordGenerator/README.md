# Password Generator

A simple and responsive password generator built using React.js. Users can generate random passwords with adjustable length and optional inclusion of numbers and special characters.

## Features
- Generate a random password
- Adjust password length (8 to 100 characters)
- Include numbers and special characters optionally
- Copy the generated password to clipboard
- Responsive UI with Tailwind CSS

## Technologies Used
- React.js (Hooks: `useState`, `useCallback`, `useEffect`, `useRef`)
- Tailwind CSS for styling

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project folder:
   ```sh
   cd 02_passwordGenerator
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
1. Open the app in your browser.
2. Adjust the password length using the range slider.
3. Check the boxes to include numbers and special characters if needed.
4. Click the **Copy** button to copy the password to the clipboard.

## Learning Outcomes
This project was built while learning React.js and provided hands-on experience with:
- React Hooks (`useState`, `useCallback`, `useEffect`, `useRef`)
- Handling controlled components in React forms
- Implementing copy-to-clipboard functionality using `useRef`
- Using `useEffect` to auto-generate passwords based on state changes
- Styling components using Tailwind CSS

## Project Structure
```
passwordGenerator/
├── node_modules/      # Dependencies
├── public/            # Static files (index.html, favicon, etc.)
├── src/               # Source code
│   ├── App.jsx        # Main component (password generator logic)
│   └── main.jsx       # Entry point for React
├── .gitignore         # Ignored files
├── package.json       # Project metadata and dependencies
└── README.md          # Project documentation
```

## License
This project is open-source and available under the MIT License.

