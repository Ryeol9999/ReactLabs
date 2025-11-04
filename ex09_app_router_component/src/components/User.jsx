import React from 'react';
import { useParams} from 'react-router-dom';
const User = () => {

    //동적 라우팅
    //MPA localhost:8090/user/1 > spring boot > @Pathvariable()
    //SPA localhost:3000/user/1 > react > userParams()
    // <Link to={`/user/1`} >{user.name}</Link>

    const {userId} = useParams();

    const users ={
        1:{id:1 ,name:"김씨", email:"kim.naver.com"},
        2:{id:2 ,name:"이씨", email:"lee.naver.com"},
        3:{id:3 ,name:"박씨", email:"park.naver.com"},
    }

    const user =users[userId]; //users[0], users[1], users[2]
    console.log(user);
    return (
        <div>
            <h3>user Details</h3>
            {
                user ? (
                    <div>
                        <h3>{user.name}</h3>
                        <p>ID : {user.id}</p>
                        <p>Email : {user.email}</p>
                    </div>
                ) : (
                    <p>User not found</p>
                )
            }
        </div>
    );
};

export default User;