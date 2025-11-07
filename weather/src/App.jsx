import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Detail from './components/pages/Detail'
import Home from './components/pages/Home'

function App() {

  return (
    <BrowserRouter>
                <Routes>
                   <Route path='/' element={<Home/>}/>
                   <Route path='/detail/:city' element={<Detail />}/>
                </Routes>
             </BrowserRouter>
  )
}

export default App
