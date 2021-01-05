import React from "react";
import './ColorTag.css';

const ColorTag = ({url, title, onSelect, nome, codice}) => {
    return (
        <div onClick={onSelect}>
            <figure className="dimensione" style={{textAlign: "center"}}>
                <img
                    className="scelta-colore responsive-img"
                    style={{width: "100px", height: "50px"}}
                    src={url} alt=""/>
                <figcaption>
                    <div>
                        <p>{nome}</p>
                        <p>{codice}</p>
                    </div>
                </figcaption>
            </figure>
        </div>
    )
}

export default ColorTag;
