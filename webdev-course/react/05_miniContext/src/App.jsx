import './App.css'
import React from 'react'
import UserContextProvider from './context/UserContextProvider'
import Login from './components/Login'
import Profile from './components/Profile'

function App() {

  return (
    <UserContextProvider>
      <h2>React and Chai</h2>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
