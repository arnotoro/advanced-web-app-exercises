import React from 'react';

const MyHOC = (Component, props) => {
    return (
        <div className="wrapper">
            <Component {...props} name={props.name}/>
        </div>
    )
}

export default MyHOC;