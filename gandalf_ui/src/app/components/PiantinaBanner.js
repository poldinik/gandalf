import React from "react";
import './PiantinaBanner.css';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {faPen, faSatellite} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ListGroup from "react-bootstrap/ListGroup";

const PiantinaBanner = () => {
    return (
        <Card className={"banner"} as={Col} lg={3}>
            <Card.Body>
                <Card.Title>Mappa Interattiva</Card.Title>
                <Card.Text style={{fontSize: "14px"}}>
                    Trova la tua abitazione e seleziona l'edificio. Puoi anche:
                </Card.Text>
                <ListGroup variant="flush" style={{marginTop: "25px"}}>
                    <ListGroup.Item> - Navigare la mappa per cercare edifici in altre zone</ListGroup.Item>
                    <ListGroup.Item style={{display: "inline"}}>- Disegnare la piantina manualemente tramite <FontAwesomeIcon icon={faPen} style={{display: "inline"}}/></ListGroup.Item>
                    <ListGroup.Item style={{display: "inline"}}>- Attivare la modalità <strong>satellite</strong> tramite <FontAwesomeIcon icon={faSatellite} style={{display: "inline"}}/></ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default PiantinaBanner;
