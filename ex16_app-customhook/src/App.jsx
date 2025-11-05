import './App.css'
import {useInput} from './useInput'

function displayData(message){
  alert(message);
}

function App() {

  const [inputValue , handleChange , handleSubmit] = useInput("hello", displayData)
  /*
    const [id, onId, submitId ] = useInput('',displayData)
    const [pw, onPw, submitPw ] = useInput('',displayData)
  */
 
  return (
    <div>
      <h3>useInput</h3>
      <input type={inputValue} onChange={handleChange} />
        
      <button onClick={handleSubmit}>확인</button>
    </div>
  )
}

export default App