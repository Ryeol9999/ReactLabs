import './App.css'
import { BrowserRouter ,Route,Routes } from 'react-router-dom'
import RegisterPage from './page/RegisterPage'
import LoginForm from './components/LoginForm'
import LoginPage from './page/LoginPage'
import InfoPage from './page/InfoPage'

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element= {<LoginPage />}/>
            <Route path="/info" element= {<InfoPage />}/>
            <Route path="/register" element= {<RegisterPage />}/>
        </Routes>
    </BrowserRouter>

     
  )
}

export default App
