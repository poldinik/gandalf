import React from "react";
import './RisposteEditor.css';
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Bearing from "./Bearing";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RisposteEditor = () => {
    return (
        <div>
            <Row>
                <Col lg={8} style={{margin: "auto"}}>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Click me!
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                                        <Tab eventKey="home" title="Home">
                                            <Bearing/>
                                            cc
                                        </Tab>
                                        <Tab eventKey="profile" title="Profile">
                                            <Bearing/>
                                            ccfff
                                        </Tab>
                                        <Tab eventKey="contact" title="Contact">
                                            <Bearing/>
                                            ccffsdswwe
                                        </Tab>
                                    </Tabs>
                                </Card.Body>
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
            </Row>
        </div>
    )
}

export default RisposteEditor;
