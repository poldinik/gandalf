import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './Supporti.css';
import Button from "react-bootstrap/Button";
import Bearing from "../Bearing";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faGlobeEurope} from "@fortawesome/free-solid-svg-icons";

const Supporti = () => {
    const space = "50px"
    return (
        <div>
            <Row>
                <Col>
                    <h6 className="support-title">Servizi Esterni</h6>
                </Col>
            </Row>
            <Bearing space={"20px"}/>
            <Row>
                <Col lg={2}>
                    <img src="asset/fi.svg" alt="fi" height={"50px"} className="services"/>
                </Col>
                <Col lg={2}>
                    <FontAwesomeIcon className="services" icon={faGlobeEurope}/>
                </Col>
                <Col lg={2}>
                    <FontAwesomeIcon  className="services" icon={faComments}/>
                </Col>
                <Col lg={2}>
                    <img src="https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/skype.svg" alt="fi" height={"50px"} className="services"/>
                </Col>
            </Row>
            <Bearing space={space}/>
            <Row>
                <Col>
                    <h6 className="support-title">Referenze</h6>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Button className="supporti-action green">Dicono di Noi</Button>
                </Col>
                <Col lg={6}>
                    <Button className="supporti-action yellow">Lavori Fatti</Button>
                </Col>
            </Row>
            <Bearing space={space}/>
            <Row>
                <Col>
                    <h6 className="support-title">Contenuti</h6>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Button className="supporti-action orange">La Finestra Perfetta</Button>
                </Col>
                <Col lg={6}>
                    <Button className="supporti-action fucia">Norme</Button>
                </Col>
            </Row>
            <Bearing space={space}/>
            <Row>
                <Col>
                    <h6 className="support-title">Altri Documenti</h6>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Button className="supporti-action blue">Download Documenti</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Supporti;
