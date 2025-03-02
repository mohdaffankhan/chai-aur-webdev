# React Router Project

A multi-page React application built using `react-router-dom`. This project implements client-side routing with dynamic routes, nested layouts, and data loading via loaders.

## Features
- Client-side routing with `react-router-dom`
- Nested layouts for consistent UI structure using `Outlet`
- Dynamic routes with URL parameters
- Data fetching using route loaders
- Modular component structure
- Responsive design with Tailwind CSS

## Technologies Used
- React.js
- React Router (`createBrowserRouter`, `createRoutesFromElements`, `RouterProvider`, `useParams`, `Outlet`)
- Fetch API (for GitHub data loader)
- Tailwind CSS for styling

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project folder:
   ```sh
   cd 04_reactRouter
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
1. Navigate through the different pages:
   - Home: `/`
   - About: `/about`
   - Contact: `/contact`
   - User Profile (dynamic): `/user/:userid`
   - GitHub Info (with loader): `/github`

## Learning Outcomes
This project was built while learning React Router and provided hands-on experience with:
- Setting up routes using `createBrowserRouter` and `createRoutesFromElements`
- Implementing nested layouts for shared page structure using `Outlet`
- Handling dynamic routes with URL parameters (`/user/:userid`) using the `useParams` hook
- Using loaders for data fetching (GitHub API integration)
- Structuring a React project with components and routing

## Project Structure
```
04_reactRouter/
├── node_modules/      # Dependencies
├── src/               # Source code
│   ├── components/    # Page components
│   │    ├── About/       # About page
│   │    ├── Contact/     # Contact page
│   │    ├── Footer/      # Footer component
│   │    ├── Github/      # GitHub info page (with loader)
│   │    ├── Header/      # Header component
│   │    ├── Home/        # Home page
│   │    └── User/        # Dynamic user page (with useParams)
│   ├── Layout.jsx     # Main layout component (with Outlet)
│   ├── main.jsx       # Entry point with router setup
│   ├── index.css      # Global styles
│   └── index.js       # Component exports
├── .gitignore         # Ignored files
├── package.json       # Project metadata and dependencies
└── README.md          # Project documentation
```

## License
This project is open-source and available under the MIT License.

