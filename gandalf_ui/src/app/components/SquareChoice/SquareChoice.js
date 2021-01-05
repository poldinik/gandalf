import React from "react";
import './SquareChoice.css';
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const SquareChoice = ({color = "#0247A8", img = "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/problems/ph3.png", title, selected, onSelected = () => {}}) => {

    const getImageStyle = (selected) => {
        if(selected){
            return { backgroundColor: "#0762e2"}
        }
        return {backgroundColor: color}
    }

    const getCardStyle = (selected) => {
        if(selected){
            return { marginBottom: '10px', boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)", backgroundColor: "rgb(7, 98, 226)"}
        }
        return { marginBottom: '10px'}
    }

    const onClick = () => {
        console.log("clicked card!")
        onSelected();
    }

    return (

        <Card style={getCardStyle(selected)} className="square-choice" onClick={onClick}>
            {
                selected ? <FontAwesomeIcon icon={faCheck} className="selected-checked"/> : null
            }
            <Card.Img variant="top" src={img} style={getImageStyle(selected)}/>
            <Card.Body className="choice-label">
                <Card.Title className="choice-title">{title}</Card.Title>
                {/*<Card.Text>*/}
                {/*    Some quick example text to build on the card title and make up the bulk of*/}
                {/*    the card's content.*/}
                {/*</Card.Text>*/}
                {/*<Button variant="primary">Go somewhere</Button>*/}
            </Card.Body>
        </Card>
    )
}

export default SquareChoice;
