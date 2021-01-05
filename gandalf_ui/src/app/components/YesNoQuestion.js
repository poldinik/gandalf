import React, {useState} from "react";
import './YesNoQuestion.css';
import {Form} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";

const YesNoQuestion = ({keyId, text = "", onAnsChange = () => {}, currentAns}) => {

    const [answered, setanswered] = useState(false);
    const distpatch = useDispatch();

    const updateAnswered = () => {
        setanswered(true);
    }

    var style;
    if (keyId % 2 === 0){
        style = {backgroundColor: "#f4f4f4", color: "#0247A8", lineHeight: 2}
    }else {
        style = {backgroundColor: "white", color: "#0247A8",  lineHeight: 2}
    }

    const onClickYes = () => {
        onAnsChange(keyId, true);
        updateAnswered();
    }

    const onClickNo = () => {
        onAnsChange(keyId, false);
        updateAnswered();
    }

    const yesStyle = {
        backgroundColor: "#0247A8"
    }

    const noStyle = {
        backgroundColor: "#0247A8"
    }

    if(answered){
        if(currentAns){
            yesStyle.backgroundColor = "#0762e2";
        }else{
            noStyle.backgroundColor = "#0762e2";
        }
    }


    return (
        <ListGroup.Item style={style} className="question">
            {text}
            <div style={{float: "right"}}>
                <Button variant="primary" className="ans-button" onClick={onClickYes} style={yesStyle}>Sì</Button>
                <Button variant="primary" className="ans-button" onClick={onClickNo} style={noStyle}>No</Button>
            </div>
        </ListGroup.Item>
    )
}

export default YesNoQuestion;
