import React from "react";
import './WorkingLabel.css';

const WorkingLabel = ({text = "Sotto sviluppo"}) => {
    return (
        <div className="be-cornerlabel u-typography-body-s">{text}</div>
    )
}

export default WorkingLabel;
