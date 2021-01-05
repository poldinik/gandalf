import React, {useRef, useState} from 'react';
import './RoomItem.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleUp,
    faArrowDown, faArrowsAltH,
    faArrowUp, faBorderStyle, faCompass, faCubes, faEdit, faLayerGroup,
    faPen,
    faPlus,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import {faArrowsAltV} from "@fortawesome/free-solid-svg-icons/faArrowsAltV";
import TipoSerramento from "./TipoSerramento";
import Piano from "./Piano";
import Quantita from "./Quantita";
import Base from "./Base";
import Altezza from "./Altezza";
import {useDispatch, useSelector} from "react-redux";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import TipoStanza from "./TipoStanza";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";

const RoomItem = (props) => {

    const [editMode, setEditMode] = useState(false);
    const processExposure = (exposure) => {
        return exposure.toUpperCase();
    }

    const roomsNumber = useSelector(state => state.roomsNumber);

    const colorExposure = props.colorExposure;
    const exposure = processExposure(props.exposure);
    const currentRoom = props.data;
    //console.log(currentRoom);
    const [options, setOptions] = useState([

        {
            name: "Piano",
            icon: faLayerGroup,
            type: "number"
        },
        {
            name: "Quantità",
            icon: faCubes,
            type: "number"
        },
        {
            name: "Base",
            icon: faArrowsAltH,
            type: "number"
        },
        {
            name: "Altezza",
            icon: faArrowsAltV,
            type: "number"
        }
    ]);
    const [visibleOptions, setVisibileOptions] = useState(true);
    const [arrow, setArrow] = useState(faAngleDown);
    const setup = currentRoom.setup;
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };


    const setSetup = (setup) => {
        //console.log("new setup");
        //console.log(JSON.stringify(setup));
        dispatch(
            {
                type: "UPDATEROOM",
                room: {...currentRoom, setup: setup}
            }
        )
    }

    const toggle = () => {
        setVisibileOptions(!visibleOptions);
        if(visibleOptions){
            setArrow(faAngleDown)
        }else{
            setArrow(faAngleUp)
        }
    }

    const onDelete = () => {
        var roomId = props.id;
        dispatch({
            type: "DELETEROOM",
            id: roomId
        })

        dispatch(
            {
                type: 'UPDATEROOMSNUMBER',
                roomsNumber: roomsNumber - 1
            }
        )
    }

    const onTipoStanzaChange = (value) => {
        setSetup({
            ...setup,
            "stanza": value
        })

    }

    const onTipoSerramentoChange = (value) => {
        setSetup({
            ...setup,
            "tipo": value
        })

    }

    const onPianoChange = (value) => {
        setSetup({
            ...setup,
            "piano": value
        })

    }

    const onQuantitaChange = (value) => {
        setSetup({
            ...setup,
            "quantita": value
        })

    }

    const onBaseChange = (value) => {
        setSetup({
            ...setup,
            "base": value
        })

    }

    const onAltezzaChange = (value) => {
        setSetup({
            ...setup,
            "altezza": value
        })

    }

    const onChangeTitle = (event) => {

    }

    var roomTitle;

    // if(setup.stanza === "Scegli..."){
    //     roomTitle = props.id + ". " + props.title;
    // } else {
    //     roomTitle = props.id + ". " + setup.stanza
    // }

    if(setup.stanza === "Scegli..."){
        roomTitle = props.title;
    } else {
        roomTitle = setup.stanza
    }

    const onGlobalEditClick = () => {
        setEditMode(true);
    }

    const onSaveOptions = () => {
        setEditMode(false);
    }

    const getIcon = () => {
        if(editMode){
            return (
                <FontAwesomeIcon icon={faSave}  style={{cursor: "pointer"}} onClick={onSaveOptions}/>
            )
        }else {
            return <div style={{cursor: "pointer"}} onClick={onGlobalEditClick} ><FontAwesomeIcon icon={faPen}/></div>
        }
    }

    const onItemLeave = () => {
        onSaveOptions();
    }

    return (
        <div onMouseLeave={onItemLeave}>
            <div className="room-panel">
                <div className="room-panel-header">
                    <div className="room-panel-content" >
                        <div className="room-panel-drag-handle">
                            <svg viewBox="0 0 64 64" width="20px" height="20px" className="data-ex-icons-vertdot"
                                 style={{fill: "currentcolor"}}>
                                <rect x="35.01" y="48.31" width="6.44" height="6.44"/>
                                <rect x="35.01" y="35.43" width="6.44" height="6.44"/>
                                <rect x="35.01" y="22.55" width="6.44" height="6.44"/>
                                <rect x="35.01" y="9.67" width="6.44" height="6.44"/>
                                <rect x="22.13" y="48.31" width="6.44" height="6.44"/>
                                <rect x="22.13" y="35.43" width="6.44" height="6.44"/>
                                <rect x="22.13" y="22.55" width="6.44" height="6.44"/>
                                <rect x="22.13" y="9.67" width="6.44" height="6.44"/>
                            </svg>
                        </div>
                        <div className="room-title">
                            <div>
                                {/*<input*/}
                                {/*    type="text"*/}
                                {/*    className="sc-kgoBCf sc-ckVGcZ bciKy room-title-editor"*/}
                                {/*    id="hty62yd:input-layer-label"*/}
                                {/*    value={roomTitle}*/}
                                {/*    onChange={onChangeTitle}*/}
                                {/*/>*/}
                                <div
                                    className="sc-kgoBCf sc-ckVGcZ bciKy room-title-editor"
                                    id="hty62yd:input-layer-label"

                                >


                                    <svg width="36" height="36" style={{marginRight: "10px"}}>
                                        <circle cx="18" cy="18" r="13" stroke="white" strokeWidth="2" fill="#0d47a1"/>
                                        Sorry, your browser does not support inline SVG.
                                        <text fill="#ffffff" fontSize="15" x="50%" y="50%" textAnchor="middle" dy=".35em" dx="0.15em">{props.id}
                                    </text>
                                    </svg>

                                    {roomTitle}


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="room-panel-actions">
                        <div ref={ref}>

                            <div className="room-action" onClick={handleClick}>
                                <div >
                                    <FontAwesomeIcon icon={faCompass} style={{color: "white", cursor: "pointer"}}/>
                                </div>
                            </div>

                            <Overlay
                                show={show}
                                target={target}
                                placement="bottom"
                                container={ref.current}
                                containerPadding={20}
                            >
                                <Popover>
                                    <Popover.Title as="h3">{exposure}</Popover.Title>
                                    <Popover.Content>
                                        Questa stanza si trova a <strong>{exposure}</strong>
                                    </Popover.Content>
                                </Popover>
                            </Overlay>
                        </div>
                        <div className="room-action">
                            {
                                getIcon()
                            }
                        </div>
                        <div className="room-action">
                            {/*<svg viewBox="0 0 64 64" width="16px" height="16px" className="data-ex-icons-trash " data-tip="true" data-for="tooltip.removeLayer_hty62yd" style={{fill: "currentcolor"}}>*/}
                            {/*    <path d="M51.4,13.9v1.6c0,0.9-0.7,1.6-1.6,1.6H13.6c-0.9,0-1.6-0.7-1.6-1.6v-1.6c0-0.9,0.7-1.6,1.6-1.6h9 c0.9,0,1.6-0.7,1.6-1.6C24.3,9.7,25.1,9,26,9h11.5c0.9,0,1.6,0.7,1.6,1.6c0,0.9,0.7,1.6,1.6,1.6h9C50.7,12.3,51.4,13,51.4,13.9z"/>*/}
                            {/*    <path d="M40.8,50.1l0.8-25.4h-3.3l-0.8,25.4H40.8z M30.1,50.1h3.3V24.7h-3.3V50.1z M26,50.1l-0.8-25.4h-3.3l0.8,25.4H26 z M44.9,55H18.5c-0.9,0-1.6-0.7-1.6-1.6l-1.5-31.2c0-0.9,0.7-1.7,1.6-1.7h29.4c0.9,0,1.7,0.8,1.6,1.7l-1.5,31.2 C46.5,54.3,45.8,55,44.9,55z"/>*/}
                            {/*</svg>*/}
                            <div  style={{cursor: "pointer"}} onClick={onDelete}><FontAwesomeIcon icon={faTrash}/></div>
                        </div>
                        <div className="room-action">
                            {/*<svg viewBox="0 0 64 64" width="16px" height="16px" className="data-ex-icons-arrowdown " data-tip="true" data-for="tooltip.layerSettings_hty62yd" style={{fill: "currentcolor"}}>*/}
                            {/*    <path d="M13.1,17.5c0.4-0.4,1.1-0.4,1.6,0L32,34.8l17.4-17.4c0.4-0.4,1.1-0.4,1.6,0l4.7,4.7c0.4,0.4,0.4,1.1,0,1.6L32.8,46.7 c-0.4,0.4-1.1,0.4-1.6,0L8.3,23.8c-0.4-0.4-0.4-1.1,0-1.6L13.1,17.5z"/>*/}
                            {/*</svg>*/}
                            <div  style={{cursor: "pointer"}} onClick={toggle}><FontAwesomeIcon icon={arrow}/></div>
                        </div>
                    </div>
                </div>
                {
                    visibleOptions ?
                        <div style={{backgroundColor: "white"}}>
                            <Row>
                                <Col>
                                    <TipoSerramento modifica={editMode} initType={setup.tipo} onchange={onTipoSerramentoChange} onedit={onGlobalEditClick}/>
                                </Col>
                                <Col>
                                    <TipoStanza modifica={editMode} initType={setup.stanza} onchange={onTipoStanzaChange} onedit={onGlobalEditClick}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Piano modifica={editMode} initType={setup.piano} onchange={onPianoChange} onedit={onGlobalEditClick}/>
                                </Col>
                                <Col>
                                    <Quantita modifica={editMode} initType={setup.quantita} onchange={onQuantitaChange} onedit={onGlobalEditClick}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Base modifica={editMode} initType={setup.base} onchange={onBaseChange} onedit={onGlobalEditClick}/>
                                </Col>
                                <Col>
                                    <Altezza modifica={editMode} initType={setup.altezza} onchange={onAltezzaChange} onedit={onGlobalEditClick}/>
                                </Col>
                            </Row>

                        </div>
                        :
                        null
                }

                {/*{*/}

                {/*    visibleOptions ?*/}
                {/*        options.map((option) => (*/}
                {/*            <div className="room-panel-config">*/}
                {/*                <div className="room-config-group">*/}
                {/*                    <div className="room-config-group-header">*/}
                {/*                        <div className="room-config-group-label">*/}
                {/*                            <span>{option.name}</span>*/}
                {/*                        </div>*/}
                {/*                        /!*<div className="room-config-group-action">*!/*/}
                {/*                        /!*    <svg viewBox="0 0 64 64" width="18px" height="18px"*!/*/}
                {/*                        /!*         className="data-ex-icons-vert-three-dots " style={{fill: "currentcolor"}}>*!/*/}
                {/*                        /!*        <rect x="28" y="44" width="8" height="8"/>*!/*/}
                {/*                        /!*        <rect x="28" y="28" width="8" height="8"/>*!/*/}
                {/*                        /!*        <rect x="28" y="12" width="8" height="8"/>*!/*/}
                {/*                        /!*    </svg>*!/*/}
                {/*                        /!*</div>*!/*/}
                {/*                    </div>*/}
                {/*                    <div className="room-config-group-content">*/}
                {/*                        <div className="side-panel-section">*/}
                {/*                            <div>*/}
                {/*                                <div>*/}
                {/*                                    <div style={{position: "relative"}}>*/}
                {/*                                        <div className="item-selector-dropdown">*/}
                {/*                                <span className="item-selector-dropdown-value">*/}
                {/*                                    <div className="layer-type-selector-item-inner">*/}
                {/*                                        <div className="room-type-selector-item-icon">*/}
                {/*                                            /!*<svg viewBox="0 0 64 64"*!/*/}
                {/*                                            /!*     width="28px"*!/*/}
                {/*                                            /!*     height="28px"*!/*/}
                {/*                                            /!*     className="point-layer-icon "*!/*/}
                {/*                                            /!*     style={{fill: "currentcolor"}}>*!/*/}
                {/*                                            /!*    <circle cx="29.4" cy="31.6" r="8.4" className="cr1"/>*!/*/}
                {/*                                            /!*     <circle cx="48.5" cy="15.7" r="6.5" className="cr2"/>*!/*/}
                {/*                                            /!*     <circle cx="11" cy="44.2" r="3" className="cr3"/>*!/*/}
                {/*                                            /!*     <circle cx="50" cy="44.2" r="5" className="cr4"/>*!/*/}
                {/*                                            /!*     <circle cx="34" cy="54.2" r="3" className="cr5"/>*!/*/}
                {/*                                            /!*     <circle cx="14" cy="16.2" r="4" className="cr6"/>*!/*/}
                {/*                                            /!*</svg>*!/*/}

                {/*                                            <FontAwesomeIcon icon={option.icon} width={"28px"} height={"28px"} className="point-layer-icon" />*/}
                {/*                                        </div>*/}
                {/*                                        <div className="room-type-selector-item-label">*/}
                {/*                                            Point <FontAwesomeIcon icon={faEdit}/>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                </span>*/}
                {/*                                        </div>*/}
                {/*                                        /!*<div className="dropdown-list">*!/*/}
                {/*                                        /!*    <div className="typeahead" tabIndex="0">*!/*/}
                {/*                                        /!*        <div className="search-container">*!/*/}
                {/*                                        /!*            <input type="text" placeholder="Search" className="typeahead-input" value=""/>*!/*/}
                {/*                                        /!*            <div className="typeahead-icon-search">*!/*/}
                {/*                                        /!*                <svg viewBox="0 0 64 64" width="18px" height="18px" className="data-ex-icons-search" style={{fill: "currentcolor"}}>*!/*/}
                {/*                                        /!*                   <path d="M56.74,53.21l-3.53,3.53a1.67,1.67,0,0,1-2.35,0L40.21,46.09A24.32,24.32,0,0,0,46.1,40.2L56.74,50.85A1.66,1.66,0,0,1,56.74,53.21Z"/>*!/*/}
                {/*                                        /!*                   <path d="M26.22,6.78A19.46,19.46,0,1,0,42.6,36.7a19.18,19.18,0,0,0,3.08-10.47A19.45,19.45,0,0,0,26.22,6.78ZM11.64,26.22A14.58,14.58,0,1,1,26.22,40.81,14.6,14.6,0,0,1,11.64,26.22Z"/>*!/*/}
                {/*                                        /!*                </svg>*!/*/}
                {/*                                        /!*            </div>*!/*/}
                {/*                                        /!*        </div>*!/*/}
                {/*                                        /!*        <div className="list-selector">*!/*/}
                {/*                                        /!*            <div className="list-item">*!/*/}
                {/*                                        /!*                <div>*!/*/}
                {/*                                        /!*                    <span className="list-item-anchor">DateTime</span>*!/*/}
                {/*                                        /!*                </div>*!/*/}
                {/*                                        /!*            </div>*!/*/}
                {/*                                        /!*        </div>*!/*/}
                {/*                                        /!*    </div>*!/*/}
                {/*                                        /!*</div>*!/*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ) )*/}

                {/*        :*/}
                {/*        null*/}
                {/*}*/}


            </div>
        </div>
    )
};

export default RoomItem;
