import React from "react";
import './WorldTag.css';


const WorldTag = ({text, color = "blue"}) => {
    return (
        <div className="world-tag" style={{backgroundColor: color, color: "#fff"}}>
            #{text}
        </div>
    )
}

export default WorldTag;
