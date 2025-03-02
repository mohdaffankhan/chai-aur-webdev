import './App.css'
import { ThemeProvider } from './context/Theme'
import { useEffect, useState } from 'react'
import Card from './components/Card'
import ThemeBtn from './components/ThemeBtn'

function App() {
    const [themeMode, setThemeMode] = useState("light");
    const darkMode = () => setThemeMode("dark"); // functions can be defined anywhere, until it has the same name
    const lightMode = () => setThemeMode("light");

    //actual change of theme
    useEffect(() => {
        document.querySelector("html").classList.remove("light" , "dark");
        document.querySelector("html").classList.add(themeMode);
    }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkMode, lightMode}}>
        <div className="flex flex-wrap min-h-screen items-center">
                <div className="w-full">
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                        <ThemeBtn/>
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                       <Card/>
                    </div>
                </div>
        </div>
    </ThemeProvider>
  )
}

export default App