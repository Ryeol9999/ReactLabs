import './App.css';
import { useFectch } from './useFetch'; './useFetch'

const baseUrl = "https://jsonplaceholder.typicode.com/";

function App() {
/*
  const [data, setData] = useState(null);

  const fetchUrl = (type) =>{
      fetch(baseUrl + "/" + type)
      .then((res)=> res.json())
      .then((data)=>setData(data));
  };

  useEffect(() =>{
    fetchUrl('users')
  },[]); //한번만   [] 
  console.log(data)

  위 부분을 별도의 사용자 훅
*/
  const {data,fetchUrl} =useFectch(baseUrl,'users');
  
  return (
    <div className="App">
        <h3>Fetch Call</h3>
        <button onClick={()=> fetchUrl('users')}>users</button>
        <button onClick={()=> fetchUrl('posts')}>posts</button>
        <button onClick={()=> fetchUrl('todos')}>todos</button>
        <pre>{JSON.stringify(data,null,2)}</pre>
    </div>
  );
}

export default App;