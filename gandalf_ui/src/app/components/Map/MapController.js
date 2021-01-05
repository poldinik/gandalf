import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPen, faPlus, faRoad, faSatellite, faTrash} from "@fortawesome/free-solid-svg-icons";
import './MapController.css';
import Bearing from "../Bearing";

const MapController = () => {
    return (
        <div className="mapboxgl-ctrl-top-right">
            <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
                <button onClick={()=> {}}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
                <button onClick={()=> {}}>
                    <FontAwesomeIcon icon={faMinus}/>
                </button>
                <button onClick={()=> {}}>
                    <FontAwesomeIcon icon={faSatellite}/>
                </button>
                <button onClick={()=> {}}>
                    <FontAwesomeIcon icon={faRoad}/>
                </button>
                <button>
                    <FontAwesomeIcon icon={faPen}/>
                </button>
                <button>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </div>
        </div>
    );

}

export default MapController;
