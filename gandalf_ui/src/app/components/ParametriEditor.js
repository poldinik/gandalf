import React from "react";
import './ParametriEditor.css';
import TextDescription from "./TextDescription";
import Bearing from "./Bearing";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {useSelector} from "react-redux";
import Nav from "react-bootstrap/Nav";

const ParametriEditor = () => {

    const detected = useSelector(state => state.detectedparameters);
    const parameters = useSelector(state => state.parameters);

    return (
        <div>
            <Row>
                <Col lg={8} className="order-lg-0 order-md-1 order-sm-0">
                    <h5>Parametro: #sintomi</h5>
                    <Bearing/>
                    <fieldset className="border p-2">
                        <legend className="w-auto">Come chiedo informazioni se non fornita?</legend>
                        <div className="fieldset-content">
                            Potrebbe indicarmi con precisione i suoi sintomi?
                        </div>
                    </fieldset>
                    <Bearing/>
                    <h5>Valori possibili per: #sintomi</h5>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Click me!
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>Hello! I'm the body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Click me!
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>Hello! I'm another body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link2" eventKey="2">
                                    Click me!
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>Hello! I'm another body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
                <Col lg={4} className="order-lg-1 order-md-0 order-sm-0">
                    <fieldset className="border p-2">
                        <legend className="w-auto">Parametri</legend>
                        <div>
                            <h6>Rilevati</h6>
                            <div>
                                <Nav variant="pills" className="flex-column">
                                    {
                                        detected.map((detect, i) => (
                                            <Nav.Link key={i} className="btn-primary detected">{detect}</Nav.Link>
                                        ))
                                    }
                                </Nav>
                            </div>
                            <Bearing space="20px"/>
                            <h6 style={{display: "inline"}}>Aggiungi altri <div className="add-button" ><FontAwesomeIcon icon={faPlus}/></div></h6>
                            <div>
                                <Nav variant="pills" className="flex-column">
                                    {
                                        parameters.length > 0
                                            ?
                                            parameters.map((detect, i) => (
                                                <Nav.Link key={i} className="btn-primary detected">{detect}</Nav.Link>
                                            ))
                                            :
                                            <div>Nessun parametro aggiunto manualmente</div>
                                    }
                                </Nav>
                            </div>
                        </div>
                    </fieldset>
                </Col>
            </Row>
        </div>
    )
}

export default ParametriEditor;
