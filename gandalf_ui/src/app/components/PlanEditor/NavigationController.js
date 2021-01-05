import React, {useState} from "react";
import './NavigationController.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowDown, faArrowLeft, faArrowRight,
    faArrowUp
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NavigationController  = ({onMove = (mv) => {}}) => {

    const [tx, setTx] = useState(100);
    const [ty, setTy] = useState(30);
    const velocity = 12;

    const onMoveClick = (ntx, nty) => {
        setTx(ntx);
        setTy(nty);
        const moveVector = [ntx, nty];
        onMove(moveVector);
    }

    const onKeyDownArrow = (e) => {
        console.log(e);
    }

    return (
        <div className="navigation-controller">
            <div className="grid-container">
                <div className="grid-item"/>
                <div className="grid-item">
                    <button className="zoom-button" onKeyDown={onKeyDownArrow} onClick={() => {
                        onMoveClick(tx, ty-velocity);
                    }}>
                        <FontAwesomeIcon icon={faArrowUp}/>
                    </button>
                </div>
                <div className="grid-item"/>
                <div className="grid-item">
                    <button className="navigation-button" onKeyDown={onKeyDownArrow} onClick={() => {
                        onMoveClick(tx - velocity, ty);
                    }}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                </div>
                <div className="grid-item"/>
                <div className="grid-item">
                    <button className="navigation-button" onKeyDown={onKeyDownArrow} onClick={() => {
                        onMoveClick(tx + velocity, ty);
                    }}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </button>
                </div>
                <div className="grid-item"/>
                <div className="grid-item">
                    <button className="navigation-button" onKeyDown={onKeyDownArrow} onClick={() => {
                        onMoveClick(tx, ty + velocity);
                    }}>
                        <FontAwesomeIcon icon={faArrowDown}/>
                    </button>
                </div>
                <div className="grid-item"/>
            </div>
            {/*<Row style={{padding: 0, maring: 0}}>*/}
            {/*    <Col style={{padding: 0}}>*/}
            {/*        <button style={{borderBottom: 0}} className="zoom-button" onClick={() => {*/}
            {/*            onMoveClick(tx, ty-velocity);*/}
            {/*        }}>*/}
            {/*            <FontAwesomeIcon icon={faArrowUp}/>*/}
            {/*        </button>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<Row style={{padding: 0, maring: 0}}>*/}
            {/*    <Col style={{padding: 0}}>*/}
            {/*        <button style={{borderBottom: 0}} className="navigation-button" onClick={() => {*/}
            {/*            onMoveClick(tx + velocity, ty);*/}
            {/*        }}>*/}
            {/*            <FontAwesomeIcon icon={faArrowRight}/>*/}
            {/*        </button>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<Row style={{padding: 0, maring: 0}}>*/}
            {/*    <Col style={{padding: 0}}>*/}
            {/*        <button className="navigation-button" onClick={() => {*/}
            {/*            onMoveClick(tx - velocity, ty);*/}
            {/*        }}>*/}
            {/*            <FontAwesomeIcon icon={faArrowLeft}/>*/}
            {/*        </button>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<Row style={{padding: 0, maring: 0}}>*/}
            {/*    <Col style={{padding: 0}}>*/}
            {/*        <button style={{borderTop: 0}} className="navigation-button" onClick={() => {*/}
            {/*            onMoveClick(tx, ty + velocity);*/}
            {/*        }}>*/}
            {/*            <FontAwesomeIcon icon={faArrowDown}/>*/}
            {/*        </button>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </div>
    )
}

export default NavigationController;
