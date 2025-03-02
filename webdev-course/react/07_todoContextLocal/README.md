# Todo App with Context and Local Storage

This is a React-based Todo application that uses Context API for state management and localStorage for data persistence. Users can add, update, delete, and toggle todos, with all changes being stored locally.

## Features

- **Add Todo**: Create new tasks with unique IDs.
- **Update Todo**: Edit the text of existing tasks.
- **Delete Todo**: Remove tasks from the list.
- **Toggle Todo**: Mark tasks as completed or pending.
- **Local Storage**: Todos are saved in `localStorage` and persist across page reloads.
- **Context API**: State management is handled via React Context.

## Project Structure

```
07_todoContextLocal/
├── node_modules/
├── src/
│   ├── components/
│   │   ├── index.js
│   │   ├── TodoForm.jsx
│   │   └── TodoItem.jsx
│   ├── context/
│   │   ├── index.js
│   │   └── TodoContext.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd 07_todoContextLocal
   ```

2. Install dependencies:

   ```bash
   npm i
   ```

3. Run the application:

   ```bash
   npm run dev
   ```

## Usage

1. **Add Todos**: Enter a task and submit the form.
2. **Edit Todos**: Modify any existing task.
3. **Toggle Completion**: Click to mark a task as complete/incomplete.
4. **Delete Todos**: Remove tasks when no longer needed.

## Core Concepts Learned

- **React Context API**: Efficiently managing global state without prop drilling.
- **Local Storage**: Persisting data across page reloads using `localStorage`.
- **Component Composition**: Structuring code with reusable components (`TodoForm`, `TodoItem`).
- **State Management**: Handling complex state transitions with `useState` and `useEffect`.

## Key Components

### `App.jsx`

- Manages todos state.
- Loads and saves todos to `localStorage`.
- Provides context to child components.

### `TodoForm.jsx`

- Accepts new todo input.
- Calls `addTodo` function from context.

### `TodoItem.jsx`

- Displays individual todos.
- Supports editing, deleting, and toggling.

### `TodoContext.js`

- Creates and exports `TodoContext`.
- Provides `TodoProvider` to share state across components.

## Custom Hooks and Context

This app uses Context to share global state across components, allowing cleaner and more maintainable code.

## Example Todo Object

```javascript
{
  id: 1700000000000,
  text: "Learn React Context",
  isCompleted: false
}
```

## Future Improvements

- Add due dates for todos.
- Implement todo categories.
- Enhance UI with animations.

## License

This project is open-source and available under the MIT License.
