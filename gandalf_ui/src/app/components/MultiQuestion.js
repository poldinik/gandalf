import React, {useState} from "react";
import './MultiQuestion.css';
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";

const MultiQuestion = ({keyId, text = "", onAnsChange = () => {}, currentAnsIndex, answers = []}) => {

    const [answered, setanswered] = useState(false);
    const distpatch = useDispatch();
    console.log("current ans:" + currentAnsIndex);

    const updateAnswered = () => {
        setanswered(true);
    }

    var style;
    if (keyId % 2 === 0){
        style = {backgroundColor: "white", color: "#0247A8",  lineHeight: 2}
    }else {
        style = {backgroundColor: "#f4f4f4", color: "#0247A8", lineHeight: 2}
    }

    const onClick = () => {
        onAnsChange(keyId, true);
        updateAnswered();
    }

    const onClickNo = () => {
        onAnsChange(keyId, false);
        updateAnswered();
    }

    const yesStyle = {
        backgroundColor: "#0762e2"
    }

    const noStyle = {
        backgroundColor: "#0247A8"
    }


    const onChoose = (i) => {
        onAnsChange(i, keyId);
    }

    return (
        <ListGroup.Item style={style} className="multi-question">
            {text}
            <div style={{float: "right"}}>
                {
                    answers.map((ans, i) => (
                        currentAnsIndex === i ?
                            <Button key={i} variant="primary" className="multi-ans-button" onClick={() => onChoose(i)} style={yesStyle}>{ans}</Button>
                            :
                            <Button  key={i}  variant="primary" className="multi-ans-button" onClick={() => onChoose(i)} style={noStyle}>{ans}</Button>

                    ))
                }
            </div>
        </ListGroup.Item>
    )
}

export default MultiQuestion;
