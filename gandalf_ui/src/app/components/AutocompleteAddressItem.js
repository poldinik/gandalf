import React from "react";
import './AutocompleteAddressItem.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkedAlt, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";

const AutocompleteAddressItem = ({address, onSelect}) => {
    return (
        <div onClick={onSelect}>
            <FontAwesomeIcon icon={faMapMarkerAlt}/> {address}
        </div>
    )
}

export default AutocompleteAddressItem;
