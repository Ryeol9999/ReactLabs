import React from 'react';

const List = ({items}) => { // {items} > ["AAA","BBB", "CCC"]
    return (
        <div>
            {
            //jsx문법
                items.map((item, index) => (
                    <li key={index}>{item}</li>
                ) )
            }   
        </div>
    );
};

export default List;