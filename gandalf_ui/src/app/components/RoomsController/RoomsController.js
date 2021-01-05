import React, {useState} from 'react';
import './RoomsController.css';
import RoomItem from "./RoomItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPointUp, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RoomsController = ({styleClass}) => {

    const data = useSelector(state => state.stepsList[7].data);
    //const [rooms, setRooms] = useState(["Stanza 1", "Stanza 2"]);

    var roomsSize = 0;

    for (var i = 0; i < data.sides.length; i++){
        roomsSize = roomsSize + data.sides[i].rooms.length;
    }


    return (
        <div id="side-panel-container" className={styleClass}>
            <div id="side-panel">
                <div id="side-panel-inner">
    {/*                <div id="side-panel-header">*/}
    {/*                    <div id="side-panel-top-header">*/}
    {/*                        <div id="side-panel-logo">*/}
    {/*                            <div id="logo-img">*/}
    {/*                                <svg className="side-panel-logo__logo" width="22px" height="15px"*/}
    {/*                                     viewBox="0 0 22 15">*/}
    {/*                                    <g transform="translate(11, -3) rotate(45.000000)">*/}
    {/*                                        <rect fill="#FFF" x="0" y="5" width="10" height="10"/>*/}
    {/*                                        <rect fill="#1FBAD6" x="5" y="0" width="10" height="10"/>*/}
    {/*                                    </g>*/}
    {/*                                </svg>*/}
    {/*                            </div>*/}
    {/*                            <div id="logo-title">*/}
    {/*                                <div id="logo-name">*/}
    {/*                                    <a className="logo__link" target="_blank" rel="noopener noreferrer" href="http://kepler.gl/">AEQUORA</a>*/}
    {/*                                </div>*/}
    {/*                                <div className="sc-eerKOB dpofk logo__version">2.2.0</div>*/}
    {/*                            </div>*/}
    {/*                        </div>*/}
    {/*                        <div id="side-panel-top-actions">*/}
    {/*                            <div className="side-panel-header-right">*/}
    {/*                                <div className="action">*/}
    {/*                                    <a target="">*/}
    {/*                                        <svg viewBox="0 0 64 64" width="20px" height="20px"*/}
    {/*                                             className="data-ex-icons-save " style={{fill: "currentcolor"}}>*/}
    {/*                                            <path*/}
    {/*d="M49.26,56.17H14.74a6.91,6.91,0,0,1-6.91-6.91V32a3.45,3.45,0,1,1,6.91,0V49.26H49.26V32a3.45,3.45,0,1,1,6.91,0V49.26A6.91,6.91,0,0,1,49.26,56.17Z"/>*/}
    {/*                                            <path*/}
    {/*d="M44.81,24.08a3.5,3.5,0,0,1-4.9,0l-4.45-4.45V35.44a3.45,3.45,0,0,1-6.91,0V19.62l-4.45,4.45a3.5,3.5,0,0,1-4.9,0,3.44,3.44,0,0,1,0-4.87L29.55,8.85a6,6,0,0,1,.52-.45,2.61,2.61,0,0,1,.62-.31,3.45,3.45,0,0,1,2.62,0,2.61,2.61,0,0,1,.62.31,6,6,0,0,1,.52.45L44.81,19.21A3.44,3.44,0,0,1,44.81,24.08Z"/>*/}
    {/*                                        </svg>*/}
    {/*                                    </a>*/}
    {/*                                </div>*/}
    {/*                            </div>*/}
    {/*                        </div>*/}
    {/*                    </div>*/}
    {/*                </div>*/}
    {/*                <div id="side-panel-bottom-header">*/}
    {/*                    <div className="side-panel-tab">*/}
    {/*                        <svg viewBox="0 0 64 64" width="20px" height="20px" className="data-ex-icons-layers "*/}
    {/*                             style={{fill: "currentcolor"}}>*/}
    {/*                            <path*/}
    {/*d="M50.88,43.52a3.2,3.2,0,0,1,0,5.86L34.56,56.52a6.42,6.42,0,0,1-5.13,0L13.12,49.37a3.2,3.2,0,0,1,0-5.86l4.62-2a6,6,0,0,0,1.48,1l2.16.95-7,3.05,16.32,7.14a3.19,3.19,0,0,0,2.56,0L49.6,46.44l-7-3.05,2.16-.95a6,6,0,0,0,1.48-.95Zm0-14.39a3.2,3.2,0,0,1,0,5.86L34.56,42.13a6.42,6.42,0,0,1-5.13,0L13.12,35a3.2,3.2,0,0,1,0-5.86l4.62-2a6,6,0,0,0,1.48,1l2.16.95-7,3.05L30.72,39.2a3.19,3.19,0,0,0,2.56,0L49.6,32.06l-7-3.05,2.16-.95a6,6,0,0,0,1.48-.95ZM13.12,20.6a3.2,3.2,0,0,1,0-5.86L29.44,7.6a6.39,6.39,0,0,1,5.13,0l16.32,7.14a3.2,3.2,0,0,1,0,5.86L34.56,27.74a6.39,6.39,0,0,1-5.13,0Z"/>*/}
    {/*                        </svg>*/}
    {/*                    </div>*/}
    {/*                </div>*/}
                    <div id="side-panel-content">
                        <div id="side-panel-content-inner">
                            {/*<div className="side-panel-content-title">Stanze</div>*/}
                            <div id="stanze-manager" style={{overflow: "scroll"}}>
                                {/*<div className="side-panel-divider"/>*/}
                                {
                                    roomsSize === 0 ?
                                        <div style={{marginTop: "50px"}}>
                                            <Row>
                                               <Col style={{textAlign: "Center"}}>
                                                   Nessuna stanza aggiunta. <br/>
                                                   <FontAwesomeIcon icon={faHandPointUp}/>  Clicca sui lati della piantina per aggiungere dinamicamente delle stanze
                                               </Col>
                                            </Row>
                                        </div> :
                                        null
                                }

                                {
                                    // mappa.data.rooms.map((room, i) => (
                                    //     <div className="side-panel-section" key={i}>
                                    //         <RoomItem title={room.name}/>
                                    //     </div>
                                    // ))

                                    data.sides.map((side, i) => {
                                        return side.rooms.map((room, j) => (
                                            <div className="side-panel-section" key={j}>
                                                <RoomItem colorExposure={side.color} exposure={side.exposure} title={room.name} key={j} sideId={room.sideId} id={room.id} data={room}/>
                                            </div>
                                            )
                                        )
                                    })
                                }

    {/*                            <div className="side-panel-section">*/}
    {/*                                <div className="add-room-button">*/}
    {/*                                    <svg viewBox="0 0 64 64" width="12px" height="12px"*/}
    {/*                                         className="data-ex-icons-add " style={{fill: "currentcolor"}}>*/}
    {/*                                        <path*/}
    {/*d="M35.93,28.57V9.89a1,1,0,0,0-1-1h-5.9a1,1,0,0,0-1,1V28.57H9.39a1,1,0,0,0-1,1v5.9a1,1,0,0,0,1,1H28.07V55.11a1,1,0,0,0,1,1h5.9a1,1,0,0,0,1-1V36.43H54.61a1,1,0,0,0,1-1v-5.9a1,1,0,0,0-1-1Z"/>*/}
    {/*                                    </svg>*/}
    {/*                                    Aggiungi*/}
    {/*                                </div>*/}
    {/*                            </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
    {/*            <div id="side-panel-close">*/}
    {/*                <svg viewBox="0 0 64 64" width="12px" height="12px" className="data-ex-icons-arrowright "*/}
    {/*                     style={{transform: "rotate(180deg)"}}>*/}
    {/*                    <path*/}
    {/*d="M26.7,54.7l-4.5-4.4c-0.4-0.4-0.4-1,0-1.4L38.6,33L22.2,17c-0.4-0.4-0.4-1,0-1.5l4.5-4.4c0.4-0.4,1.1-0.4,1.5,0 l17.1,16.7l4.5,4.4c0.4,0.4,0.4,1,0,1.4L45.2,38L28.2,54.7C27.8,55.1,27.1,55.1,26.7,54.7"/>*/}
    {/*                </svg>*/}
    {/*            </div>*/}
            </div>
        </div>
    )
};

export default RoomsController;
