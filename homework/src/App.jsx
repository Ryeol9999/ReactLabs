import './App.css'
import {Route,Routes,BrowserRouter, Link} from 'react-router-dom'
import Form from './pages/Form'
import Detail from './pages/Detail'
import List from './pages/list'

function App() {

  return (
    <BrowserRouter>
    <div>
   
   <div>
          <ul>
              <li>
                <Link to="/list">List</Link>
              </li>
              <li>
                <Link to="/form">Form</Link>
              </li>
          </ul>
   </div>     
   
        <Routes>
          <Route path="/list" element={<List />} />
          <Route path="/form" element={<Form />} />
          <Route path="/detail/:id" element={<Detail />} />
      </Routes>
   
  
  </div>
  </BrowserRouter>
  )
}

export default App
