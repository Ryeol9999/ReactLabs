import React from 'react';

const Child = ({name}) => {
    console.log("child component 가 렌더링 되어있습니다 .. 호출")
    return (
        <div>
            Child 컴포넌트{name}
        </div>
    );
};

//name > memo > 
export default React.memo(Child);