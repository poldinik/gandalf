import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBorderAll, faBuilding, faPen, faRoad, faSatellite, faTrash} from "@fortawesome/free-solid-svg-icons";
import {DrawPolygonMode} from "react-map-gl-draw";
import './AddressSearchBar.css';

const AddressSearchBar = () => {
    const { register, errors, handleSubmit } = useForm();
    const [address, setAddress] = useState("");

    return (
        <div className="mapboxgl-ctrl-top-left">
            <div className="mapboxgl-ctrl-geocoder mapboxgl-ctrl search-bar-custom">
                <svg className="mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-search" viewBox="0 0 18 18" xmlSpace="preserve" width="18" height="18">
                    <path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"/>
                </svg>
                <input type="text" className="mapboxgl-ctrl-geocoder--input" placeholder="Cerca..." aria-label="Search"/>
                    <div className="suggestions-wrapper">
                        <ul className="suggestions" style={{display: "none"}}/>
                    </div>
                    <div className="mapboxgl-ctrl-geocoder--pin-right">
                        <button aria-label="Clear" className="mapboxgl-ctrl-geocoder--button" style={{display: "none"}}>
                            <svg className="mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-close" viewBox="0 0 18 18" xmlSpace="preserve" width="18" height="18">
                                <path d="M3.8 2.5c-.6 0-1.3.7-1.3 1.3 0 .3.2.7.5.8L7.2 9 3 13.2c-.3.3-.5.7-.5 1 0 .6.7 1.3 1.3 1.3.3 0 .7-.2 1-.5L9 10.8l4.2 4.2c.2.3.7.3 1 .3.6 0 1.3-.7 1.3-1.3 0-.3-.2-.7-.3-1l-4.4-4L15 4.6c.3-.2.5-.5.5-.8 0-.7-.7-1.3-1.3-1.3-.3 0-.7.2-1 .3L9 7.1 4.8 2.8c-.3-.1-.7-.3-1-.3z"/>
                            </svg>
                        </button>
                        <svg className="mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-loading" viewBox="0 0 18 18" xmlSpace="preserve" width="18" height="18">
                            <path fill="#333" d="M4.4 4.4l.8.8c2.1-2.1 5.5-2.1 7.6 0l.8-.8c-2.5-2.5-6.7-2.5-9.2 0z"/>
                            <path opacity=".1" d="M12.8 12.9c-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.7l-.8-.8c-2.5 2.5-2.5 6.7 0 9.2s6.6 2.5 9.2 0 2.5-6.6 0-9.2l-.8.8c2.2 2.1 2.2 5.6 0 7.7z"/>
                        </svg>
                    </div>
            </div>
        </div>
    )
}

export default AddressSearchBar;
