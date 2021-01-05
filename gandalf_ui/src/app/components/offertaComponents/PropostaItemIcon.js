import React from "react";
import './PropostaItemIcon.css'

const PropostaItemIcon = ({src = ""}) => {
    return (
        <img src={src} className="proposta-item-icon" alt="icon"/>
    )
}

export default PropostaItemIcon;
