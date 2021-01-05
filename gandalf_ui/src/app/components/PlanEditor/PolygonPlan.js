import React from "react";

const PolygonPlan = ({sides = [], color = "rgba(33,152,250,0.40)"}) => {
    //x1={linePoints[0].x} y1={linePoints[0].y} x2={linePoints[1].x} y2={linePoints[1].y}
    var pointsDef = "";
    for(var i = 0; i < sides.length; i++){
        var side = sides[i];
        //console.log(side);
        pointsDef = pointsDef + side.points[0].x + "," + side.points[0].y + " "
    }

    return (
        <polygon points={pointsDef} style={{fill: color}} />
    )
}

export default PolygonPlan;
