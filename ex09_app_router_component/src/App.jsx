import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'


function App() {
  //주소창에다 직접입력
  //

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/user' element={<Users/>} />
      <Route path='/user/:userId' element={<User/>} />
    {/*

      동적 라우팅: localhosting: 3000/user/1, localhosting: 3000/user/2 >> userparams로 받음

    */}

    </Routes>
  </BrowserRouter>  
  )
}

export default App
