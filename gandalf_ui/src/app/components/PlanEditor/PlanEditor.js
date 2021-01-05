import React, {useCallback, useState} from "react";
import RoomItem from "../RoomsController/RoomItem";
import './PlanEditor.css';
import PlanSide from "./PlanSide";
import {useDispatch, useSelector} from "react-redux";
import PlanRoom from "./PlanRoom";
import ZoomController from "./ZoomController";
import NavigationController from "./NavigationController";
import Cardinal from "./Cardinal";
import PolygonPlan from "./PolygonPlan";


//http://www.petercollingridge.co.uk/tutorials/3d/pygame/matrix-transformations/

//http://www.petercollingridge.co.uk/tutorials/svg/interactive/pan-and-zoom/
const PlanEditor = ({styleClass}) => {

    const dispatch = useDispatch();
    const [rx, setRx] = useState(1);
    const [ry, setRy] = useState(1);
    const [tx, setTx] = useState(100);
    const [ty, setTy] = useState(30);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [stroke, setStroke] = useState(4);
    const [svgHeight, setSvgHeight] = useState('100%');
    const selectedBuildingPoints = useSelector(state => state.stepsList[6].data.selectedPoints);

    const svgContainerRef = useCallback(node => {
        if (node !== null) {
            //console.log(node);
            setSvgHeight(node.clientWidth);
        }
    }, []);

    //const sides = useSelector(state => state.stepsList[10].data.sides);


    const sides = useSelector(state => state.stepsList[7].data.sides);
    //const computedSides = useSelector(state => state.sides);
    //console.log(sides);
    //console.log("DIO CANER");
    //console.log(sides);
    //const roomPoints = useSelector(state => state.steps.mappa.data.roomPoints);

    // var roomsList = []
    //
    // for (var i = 0; i < sides.length; i++){
    //     for(var j = 0; j < sides[i].rooms.length; j++){
    //         console.log(sides[i].rooms[j]);
    //         roomsList = [...roomsList, sides[i].rooms[j]]
    //     }
    // }

    //console.log("rooms List");
    //console.log(roomsList);

    function getMousePos(e) {
        return {
            x: e.clientX,
            y: e.clientY
        };
    }

    const onMouseGrab = (event) => {
        var coords = getMousePos(event);
        var newX = coords.x;
        var newY = coords.y;

        var x = newX - posX;
        var y = newY - posY;
        if(x > 0){
            setTx(tx + 1 );
        }else {
            setTx(tx - 1 );
        }

        if(y > 0){
            setTy(ty + 1 );
        }else {
            setTy(ty - 1 );
        }

        if (x != 0){
            setPosX(x);
        }
        if (y != 0){
            setPosY(y);
        }
    }

    return (
        <div id="side-panel-plan-container" className={styleClass} ref={svgContainerRef}>
            <div id="side-panel">
                <div id="side-panel-inner">
                    <div id="side-panel-content">
                        <div id="side-panel-content-inner">
                            {/*<div className="side-panel-content-title">Piantina</div>*/}
                            <div id="plan-manager" style={{overflow: "scroll"}}>
                                {/*<div className="side-panel-divider"/>*/}
                                <ZoomController
                                    onZoom={(mv) => {
                                        console.log(mv);
                                        setRx(mv[0]);
                                        setRy(mv[1]);
                                    }}
                                />
                                <NavigationController onMove={(mv) => {
                                    console.log(mv);
                                    setTx(mv[0]);
                                    setTy(mv[1]);
                                }}/>
                                <Cardinal name="Nord" position={{top: 10, left: "50%"}}/>
                                <Cardinal name="Sud" position={{bottom: 0, left: "50%"}}/>
                                <Cardinal name="Est" position={{top: "50%", left: 30}}/>
                                <Cardinal name="Ovest" position={{top: "50%", right: 30}}/>
                                <svg className="svg-plan-style" style={{backgroundColor: "white"}} id="plan" onDrag={onMouseGrab} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height={svgHeight} width="100%">
                                    <g transform={"matrix(" + rx + " " + "0 0 " + ry + " " + tx + " " + ty + ")"}>
                                        {
                                            <PolygonPlan sides={sides}/>
                                        }
                                        {
                                            sides.map(
                                                (side, i) =>
                                                    <PlanSide key={i} id={side.sideId} linePoints={side.points} color={side.color}/>)
                                                    //<PlanSide key={i} id={side.sideId} linePoints={side.points}/>)
                                        }
                                        {
                                            // roomPoints.map((roomPoint, i) => <PlanRoom key={i} data={roomPoint}/>)

                                            sides.map((side, i) =>{
                                                return side.rooms.map((room, j) => (
                                                    <PlanRoom key={j} data={room}/>
                                                ))
                                            })
                                            // roomsList.map((room, j) => (
                                            //     <PlanRoom key={j} data={room}/>
                                            // ))
                                            //<PlanRoom data={{id: 1, cx: 264.7547940467332, cy: 134.58331904052358}}/>
                                        }

                                    </g>
                                </svg>
                                {/*<object data="/asset/traiettoria.svg" type="image/svg+xml" style={{position: "absolute", top: 0}}>*/}

                                {/*</object>*/}
                            </div>
                        </div>
                    </div>
                </div>
                {/*            <div id="side-panel-close" style={{cursor: "pointer"}} onClick={() => dispatch({type: "EDITORVISIBLE", visible: false})}>*/}
                {/*                <svg viewBox="0 0 64 64" width="12px" height="12px" className="data-ex-icons-arrowright "*/}
                {/*                     style={{transform: "rotate(180deg)"}}>*/}
                {/*                    <path*/}
                {/*d="M26.7,54.7l-4.5-4.4c-0.4-0.4-0.4-1,0-1.4L38.6,33L22.2,17c-0.4-0.4-0.4-1,0-1.5l4.5-4.4c0.4-0.4,1.1-0.4,1.5,0 l17.1,16.7l4.5,4.4c0.4,0.4,0.4,1,0,1.4L45.2,38L28.2,54.7C27.8,55.1,27.1,55.1,26.7,54.7"/>*/}
                {/*                </svg>*/}
                {/*            </div>*/}
            </div>
        </div>
    )
}


export default PlanEditor;
