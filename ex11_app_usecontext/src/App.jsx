import { useState, createContext, useContext } from 'react'
import './App.css'

const ThemeContext = createContext();


function App() {   //root component
  const [theme, setTheme] = useState('light')

  
  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
      <Toolbar></Toolbar>
    </ThemeContext.Provider>
  )
}

function Toolbar() { // Theme 사용 x
  return(
    <div>
      <h3>Toolbar</h3>
      <ThemeButton />
    </div>
  )
}

function ThemeButton(){
  //나는 필요하다 부모 컴포넌트가 가지고 있는 데이터
  const {theme,setTheme} =useContext(ThemeContext); //전역객체 사용
  return(
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
      }}
    >
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  )
}
export default App
