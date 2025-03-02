import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [characters, setCharacters] = useState(false)

  //useRef hook
  const passwordRef = useRef(null) // initial value null

  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str += "0123456789"
    if(characters) str += "!@#$%^&*()_+"

    for(let i = 0; i < length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, number, characters, setPassword])

  useEffect(() => { generatePassword() }, [length, number, characters, generatePassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.focus() // focus on input field
    passwordRef.current?.setSelectionRange(0, 999) // select value in range 0 to 999
    window.navigator.clipboard.writeText(password) // write text in clipboard
  }, [password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" placeholder='Password' value={password} className="outline-none w-full py-1 px-3" readOnly ref={passwordRef} />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer' onClick={copyPasswordToClipBoard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-4'>
        <div className='flex items-center gap-1'>
          <input type="range" min={8} max={100} value={length} label="Length" className='cursor-pointer'onChange={(e) => setLength(Number(e.target.value))} />
          <label>Length: {length}</label>
        </div>

        <div className='flex items-center gap-1'>
          <input type="checkbox" className='cursor-pointer' onChange={(e) => setCharacters(e.target.checked)} />
          <label>Characters</label>
        </div>

        <div className='flex items-center gap-1'>
          <input type="checkbox" className='cursor-pointer' onChange={(e) => setNumber(e.target.checked)} />
          <label>Numbers</label>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
