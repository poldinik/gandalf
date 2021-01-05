import React from "react";

const Cardinal = ({name = "", position = {}}) => {
    return (
        <div style={{...position, fontWeight: 500, fontSize: 17, color: "black", position: "absolute"}}>
            {name}
        </div>
    )
}

export default Cardinal
