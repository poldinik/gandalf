import React from "react";
import './Divider.css';

const Divider = ({color = "#0247A8"}) => {
    return (
        <div className="divider" style={{backgroundColor: color}}/>
    );
}

export default Divider;

//rgba(34,34,34,0.16)
