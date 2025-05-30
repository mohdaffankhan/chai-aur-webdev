import React from 'react'
import { useState, useContext } from 'react'
import UserContext from '../context/UserContext'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {setUser} = useContext(UserContext)
    return (
        <div>
            <h2>Login</h2>
            <input type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='username'
            />
            {" "}
            <input type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password' 
            />
            <button onClick={() => setUser({username, password})}>Login</button>
        </div>
    )
}

export default Login
