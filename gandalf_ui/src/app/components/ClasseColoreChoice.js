import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {faCompass, faSwatchbook} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './ClasseColoreChoice.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ClasseColoreChoice = ({color = "blue", img, title, description, onButtonClick = () => {}}) => {
    return (
        <Card style={{marginBottom: '10px', color: "white", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"}}>
            <Card.Body className="fi-primary">
                <Row>
                    <Col>
                        <Card.Title style={{fontWeight: 700}}>{title}</Card.Title>
                        <Card.Text>
                            {description}
                        </Card.Text>
                    </Col>
                </Row>
                <Row style={{textAlign: "left"}} className="action-choice-color">
                    <Col>
                        <Button className="fi-primary" style={{border: 0}} onClick={onButtonClick}><FontAwesomeIcon icon={faSwatchbook} style={{color: "white"}}/>  Accedi alla classe</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default ClasseColoreChoice;
