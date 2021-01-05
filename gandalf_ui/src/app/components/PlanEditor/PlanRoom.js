import React from "react";
import './PlanRoom.css';

const PlanRoom = ({data}) => {



    return (
        <g className="plan-room">
            <circle cx={data.cx} cy={data.cy} r="15" style={{stroke: "rgb(4,68,171)", fill: "rgb(255,255,255)", strokeWidth: "3"}}/>
            <text x={data.cx} y={data.cy} textAnchor="middle" stroke="black" strokeWidth="1px" dy=".3em">{data.id}</text>
        </g>
    )
}

export default PlanRoom;
