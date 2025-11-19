import axios from "axios";

const API = axios.create(
    {
    baseURL : 'http://localhost:8090',
    withCredentials: true, // 쿠키 전송 필요 ( 토큰 사용시 설정 : jwt 쓰지 않으면 설정하지 않아도 됨)
    }
);
    API.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        console.log("전송할 토근 : " + token);

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
         }
         return config;
    });
    
// 인터셉터가 요청을 가로챔
    

    // 컴포넌트 (여러개의 함수, 변수 내보낼수 있다)
    // export

    // API.post('/login')
    
    //login
    export const login = (data) => API.post('/login', data);

    //register
    export const register = (data) => API.post('/register', data);

    //user_info
    export const getUserInfo = () => API.get('/user/info');
