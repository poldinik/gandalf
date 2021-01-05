import React from "react";
import './MotivazioneSquareChoice.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const MotivazioneSquareChoice = ({color = "#0247A8", img, title, selected, onSelected = () => {}}) => {

    const getImageStyle = (selected) => {
        if(selected){
            return { backgroundColor: "#0762e2"}
        }
        return {backgroundColor: color}
    }

    const getCardStyle = (selected) => {
        if(selected){
            return {backgroundColor: "#0762e2", marginBottom: '10px', boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"}
        }
        return { backgroundColor: "#0247A8", marginBottom: '10px'}
    }

    const onClick = () => {
        console.log("clicked card!")
        onSelected();
    }

    return (
        <Card style={getCardStyle(selected)} className="motivazione-square-choice" onClick={onClick}>
            {
                selected ? <FontAwesomeIcon icon={faCheck} className="selected-checked"/> : null
            }
            <Card.Img variant="top" src={img} style={getImageStyle(selected)}/>
            <Card.Body className="motivazione-choice-label">
                <Card.Title className="motivazione-choice-title">{title}</Card.Title>
                {/*<Card.Text>*/}
                {/*    Some quick example text to build on the card title and make up the bulk of*/}
                {/*    the card's content.*/}
                {/*</Card.Text>*/}
                {/*<Button variant="primary">Go somewhere</Button>*/}
            </Card.Body>
        </Card>
    )
}

export default MotivazioneSquareChoice;
