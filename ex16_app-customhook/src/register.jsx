import { useInput } from "./useInput";

export default function MultiInputExample() {

  const printName = (val) => console.log("이름:", val);
  const printEmail = (val) => console.log("이메일:", val);
  const printPhone = (val) => console.log("전화번호:", val);

  const [name, onNameChange, submitName] = useInput("", printName);
  const [email, onEmailChange, submitEmail] = useInput("", printEmail);
  const [phone, onPhoneChange, submitPhone] = useInput("", printPhone);

  /*
    useInput(initValue, submitAction)

    const [inputValue , setInputValue] = useState(initValue); //초기값

    const handleChange = (e) =>{
        setInputValue(e.target.value);
    }
    
    const handleSubmit = () => {
        setInputValue('');
        submitAction(initValue);  //useInput(initValue, submitAction)
    }
    
    return  [inputValue , handleChange(주소) , handleSubmit(주소)] ;

   ---------------------------------------------------------

    
    const [email , setInputValue] = useState(initValue); //초기값

    const onEmailChange = (e) =>{
        setInputValue(e.target.value);
    }
    
    const submitEmail = () => {
        setInputValue('');
        submitAction(initValue);  //useInput(initValue, submitAction)
    }

    ------------------
     const [phone , setInputValue] = useState(initValue); //초기값

    const onPhoneChange = (e) =>{
        setInputValue(e.target.value);
    }
    
    const submitName = () => {
        setInputValue('');
        submitAction(initValue);  //useInput(initValue, submitAction)
    }

    ---------------------

     const [name , setInputValue] = useState(initValue); //초기값

    const onNameChange = (e) =>{
        setInputValue(e.target.value);
    }
    
    const submitPhone = () => {
        setInputValue('');
        submitAction(initValue);  //useInput(initValue, submitAction)
    }


    이런식으로 고쳐야 되는걸 반복되는 코드를  줄일수 있다.
    입력값 검증하는, 비동기 요청쪽을 훅으로해서 사용자정의 훅으로해서 
    ai 요청시 코드양을 줄일수 있다.
  */
  return (
    <div style={{ padding: 20 }}>
      <h3>여러 개 Input 예제</h3>

      <div>
        <input
          value={name}
          placeholder="이름 입력"
          onChange={onNameChange}
        />
        <button onClick={submitName}>확인</button>
      </div>

      <div>
        <input
          value={email}
          placeholder="이메일 입력"
          onChange={onEmailChange}
        />
        <button onClick={submitEmail}>확인</button>
      </div>

      <div>
        <input
          value={phone}
          placeholder="전화번호 입력"
          onChange={onPhoneChange}
        />
        <button onClick={submitPhone}>확인</button>
      </div>
    </div>
  );
}