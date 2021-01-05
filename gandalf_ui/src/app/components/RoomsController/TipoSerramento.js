import React, {useState} from "react";
import './RoomItem.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBorderStyle, faEdit, faInfo, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";

const TipoSerramento = ({initType, onchange, modifica, onedit = () => {}}) => {
    const [type, setType] = useState(initType);
    const icon = faBorderStyle;
    const saveIcon = faSave;
    const [edit, setEdit] = useState(false);
    //const [editMode, setEditMode] = useState(modifica);
    const editMode = modifica;
    const [originalType, setOriginalType] = useState(type);


    const onMouseOver = () => {
        setEdit(true);
    }

    const onMouseLeave = () => {
        if(!editMode){
            setEdit(false);
        }
    }

    const onSave = () => {
        //setEditMode(false);
        onchange(type);
    }

    const onCancel = () => {
        //setEditMode(false);
        setType(originalType);
    }

    const onInfo = () => {

    }

    const getIcon = () => {
        if(editMode){
            return (
                <div style={{display: "inline"}}>
                    {/*<FontAwesomeIcon icon={faInfo} style={{cursor: "pointer"}} onClick={onInfo}/>*/}
                    {/*&nbsp;&nbsp;&nbsp;&nbsp;*/}
                    {/*<FontAwesomeIcon icon={faTimes} style={{cursor: "pointer"}} onClick={onCancel}/>*/}
                    {/*&nbsp;&nbsp;&nbsp;&nbsp;*/}
                    <FontAwesomeIcon icon={faSave} style={{cursor: "pointer"}} onClick={onSave}/>
                </div>
            )
        }else {
            return <FontAwesomeIcon icon={faEdit} style={{cursor: "pointer"}} onClick={onEditButtonClick}/>
        }
    }



    const onEditButtonClick = () => {
        //setEditMode(true);
    }

    const onSelectChange = (event) => {
        setType(event.target.value);
        onchange(event.target.value);
    }

    const onFieldClick = () => {
        onedit()
    }

    return (
        <div className="room-panel-config" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            <div className="room-config-group">
                <div className="room-config-group-header">
                    <div className="room-config-group-label">
                        <span>
                            Tipo serramento &nbsp;
                            {/*{*/}
                            {/*    edit ?*/}
                            {/*        getIcon()*/}
                            {/*    :*/}
                            {/*        null*/}
                            {/*}*/}
                        </span>
                    </div>
                    {/*<div className="room-config-group-action">*/}
                    {/*    <svg viewBox="0 0 64 64" width="18px" height="18px"*/}
                    {/*         className="data-ex-icons-vert-three-dots " style={{fill: "currentcolor"}}>*/}
                    {/*        <rect x="28" y="44" width="8" height="8"/>*/}
                    {/*        <rect x="28" y="28" width="8" height="8"/>*/}
                    {/*        <rect x="28" y="12" width="8" height="8"/>*/}
                    {/*    </svg>*/}
                    {/*</div>*/}
                </div>
                <div className="room-config-group-content">
                    <div className="side-panel-section">
                        <div>
                            <div>
                                <div style={{position: "relative"}}>
                                    <div className="item-selector-dropdown">
                                                <span className="item-selector-dropdown-value">
                                                    <div className="layer-type-selector-item-inner">
                                                        <div className="room-type-selector-item-icon">
                                                            {/*<svg viewBox="0 0 64 64"*/}
                                                            {/*     width="28px"*/}
                                                            {/*     height="28px"*/}
                                                            {/*     className="point-layer-icon "*/}
                                                            {/*     style={{fill: "currentcolor"}}>*/}
                                                            {/*    <circle cx="29.4" cy="31.6" r="8.4" className="cr1"/>*/}
                                                            {/*     <circle cx="48.5" cy="15.7" r="6.5" className="cr2"/>*/}
                                                            {/*     <circle cx="11" cy="44.2" r="3" className="cr3"/>*/}
                                                            {/*     <circle cx="50" cy="44.2" r="5" className="cr4"/>*/}
                                                            {/*     <circle cx="34" cy="54.2" r="3" className="cr5"/>*/}
                                                            {/*     <circle cx="14" cy="16.2" r="4" className="cr6"/>*/}
                                                            {/*</svg>*/}

                                                            <FontAwesomeIcon icon={icon} width={"28px"} height={"28px"} className="point-layer-icon" />
                                                        </div>
                                                        <div onClick={onFieldClick} className="room-type-selector-item-label">
                                                            {
                                                                editMode ?
                                                                    <form>
                                                                        <select value={type} className="styled-select" name="types" onChange={onSelectChange}>
                                                                            <option value="Finestra 1 anta">Finestra 1 anta</option>
                                                                            <option value="Finestra 1 anta con fisso superiore">Finestra 1 anta con fisso superiore</option>
                                                                            <option value="Finestra 1 anta con fisso inferiore">Finestra 1 anta con fisso inferiore</option>
                                                                            <option value="Finestra 2 ante">Finestra 2 ante</option>
                                                                            <option value="Finestra 2 ante con fisso laterale">Finestra 2 ante con fisso laterale</option>
                                                                            <option value="Finestra 2 ante con due fissi laterali">Finestra 2 ante con due fissi laterali</option>
                                                                            <option value="Finestra 2 ante con fisso verticale">Finestra 2 ante con fisso verticale</option>
                                                                            <option value="Finestra 2 ante con fisso inferiore">Finestra 2 ante con fisso inferiore</option>
                                                                            <option value="Finestra 3 ante con montante fiss">Finestra 3 ante con montante fisso</option>
                                                                            <option value="Fisso">Fisso</option>
                                                                            <option value="Fisso falsa anta">Fisso falsa anta</option>
                                                                            <option value="Fisso con traverso">Fisso con traverso</option>
                                                                            <option value="Portafinestra 1 anta<">Portafinestra 1 anta</option>
                                                                            <option value="Portafinestra 1 anta con traverso">Portafinestra 1 anta con traverso</option>
                                                                            <option value="Portafinestra 1 anta con fisso superiore">Portafinestra 1 anta con fisso superiore</option>
                                                                            <option value="Portafinestra 1 anta e vasistas superiore">Portafinestra 1 anta e vasistas superiore</option>
                                                                            <option value="Portafinestra 2 ante">Portafinestra 2 ante</option>
                                                                            <option value="Portafinestra 2 ante con traverso">Portafinestra 2 ante con traverso</option>
                                                                            <option value="Portafinestra 2 ante con fisso laterale">Portafinestra 2 ante con fisso laterale</option>
                                                                            <option value="Portafinestra 2 ante con trav. e fisso lat">Portafinestra 2 ante con trav. e fisso lat.</option>
                                                                            <option value="Portafinestra 2 ante con fisso superiore">Portafinestra 2 ante con fisso superiore</option>
                                                                            <option value="Portafinestra 2 ante e vasistas superiore<">Portafinestra 2 ante e vasistas superiore</option>
                                                                            <option value="Portafinestra 3 ante con montante fisso">Portafinestra 3 ante con montante fisso</option>
                                                                            <option value="Scorrevole parallelo con fisso laterale">Scorrevole parallelo con fisso laterale</option>
                                                                            <option value="Scorrevole parallelo e finestra laterale">Scorrevole parallelo e finestra laterale</option>
                                                                            <option value="Vasistas">Vasistas</option>
                                                                        </select>
                                                                    </form>
                                                                    :
                                                                    type
                                                            }
                                                        </div>
                                                    </div>
                                                </span>
                                    </div>
                                    {/*<div className="dropdown-list">*/}
                                    {/*    <div className="typeahead" tabIndex="0">*/}
                                    {/*        <div className="search-container">*/}
                                    {/*            <input type="text" placeholder="Search" className="typeahead-input" value=""/>*/}
                                    {/*            <div className="typeahead-icon-search">*/}
                                    {/*                <svg viewBox="0 0 64 64" width="18px" height="18px" className="data-ex-icons-search" style={{fill: "currentcolor"}}>*/}
                                    {/*                   <path d="M56.74,53.21l-3.53,3.53a1.67,1.67,0,0,1-2.35,0L40.21,46.09A24.32,24.32,0,0,0,46.1,40.2L56.74,50.85A1.66,1.66,0,0,1,56.74,53.21Z"/>*/}
                                    {/*                   <path d="M26.22,6.78A19.46,19.46,0,1,0,42.6,36.7a19.18,19.18,0,0,0,3.08-10.47A19.45,19.45,0,0,0,26.22,6.78ZM11.64,26.22A14.58,14.58,0,1,1,26.22,40.81,14.6,14.6,0,0,1,11.64,26.22Z"/>*/}
                                    {/*                </svg>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*        <div className="list-selector">*/}
                                    {/*            <div className="list-item">*/}
                                    {/*                <div>*/}
                                    {/*                    <span className="list-item-anchor">DateTime</span>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TipoSerramento;
