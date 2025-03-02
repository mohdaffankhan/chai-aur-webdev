# Currency Converter

A dynamic and responsive currency converter built using React.js. Users can convert between different currencies with real-time rates using a custom hook for fetching and processing currency data.

## Features
- Convert between multiple currencies
- Real-time exchange rate updates using the [ExchangeRate API](https://www.exchangerate-api.com/)
- Custom hook for handling currency data
- Interactive UI with input fields for conversion
- Responsive design using Tailwind CSS

## Technologies Used
- React.js (Hooks: `useState`, `useEffect`)
- Custom Hooks (for currency data fetching)
- Fetch API (for real-time currency rates)
- Tailwind CSS for styling

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project folder:
   ```sh
   cd 03_currencyConvertor
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
2. Select the source and target currencies.
3. Enter the amount to convert.
4. View the converted value in real-time.

## Learning Outcomes
This project was built while learning React.js and provided hands-on experience with:
- Creating and using custom hooks (`useCurrencyInfo`)
- Managing component state with `useState`
- Fetching and using API data with `useEffect`
- Implementing real-time data using the ExchangeRate API
- Building reusable components (InputBox for currency input)
- Structuring a React project with components and hooks
- Styling using Tailwind CSS

## Project Structure
```
03_currencyConvertor/
├── node_modules/      # Dependencies
├── src/               # Source code
│   ├── components/    # Reusable components
│   │    └── InputBox.jsx  # Input component for currency
│   ├── hooks/         # Custom hooks
│   │    └── useCurrencyInfo.js  # Custom hook for currency data
│   ├── App.jsx        # Main component (conversion logic)
│   ├── main.jsx       # Entry point for React
│   └── index.css      # Global styles
├── .gitignore         # Ignored files
├── package.json       # Project metadata and dependencies
└── README.md          # Project documentation
```

## License
This project is open-source and available under the MIT License.

