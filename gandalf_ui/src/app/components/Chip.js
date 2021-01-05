import React from "react";
import './Chip.css';

const Chip = (props) => {

    const remove = () => {
        props.onDelete(props.link);
    }

    return (
        <div className="chip">
            {props.link}
            <span className="closebtn" onClick={remove}>&times;</span>
        </div>
    )
}

export default Chip;
