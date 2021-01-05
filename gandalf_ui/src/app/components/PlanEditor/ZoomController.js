import React, {useState} from "react";
import './ZoomController.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMinus,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Bearing from "../Bearing";

const ZoomController  = ({onZoom = () => {}}) => {

    const [rx, setRx] = useState(1);
    const [ry, setRy] = useState(1);
    const velocity = 0.1;

    const onMoveClick = (nrx, nry) => {
        if(nrx > 0.1){
            setRx(nrx);
            setRy(nry);
            const moveVector = [nrx, nry];
            onZoom(moveVector);
        }

    }

    return (
        <div className="zoom-controller">
            <Row>
                <Col>
                    <button className="zoom-button" onClick={() => {
                        onMoveClick(rx + velocity, ry + velocity);
                    }}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </Col>
            </Row>
            <Bearing space={"3px"}/>
            <Row>
                <Col>
                    <button className="zoom-button" onClick={() => {
                        onMoveClick(rx - velocity, ry - velocity);
                    }}>
                        <FontAwesomeIcon icon={faMinus}/>
                    </button>
                </Col>
            </Row>
        </div>
    )
}

export default ZoomController;
