import React, {useState} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import './QuestionItem.css';

const QuestionItem = ({question, onDelete, onEdit}) => {

    const [visibleButtonDelete, setVisibleButtonDelete] = useState(false);

    const onDeleteClick = () => {
        onDelete();
    }

    const onEditClick = () => {
        onEdit();
    }

    const onMouseOver = () => {
        setVisibleButtonDelete(true);
    }

    const onMouseLeave = () => {
        setVisibleButtonDelete(false);
    }

    return (
        <ListGroup.Item>

            {
                visibleButtonDelete ?
                    <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
                        <div style={{display: "inline"}}>{question}</div>
                        <div className="delete-button" onClick={onEditClick}><FontAwesomeIcon icon={faEdit}/></div>
                        <div className="delete-button" onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash}/></div>
                    </div>
                    :
                    <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>{question}</div>
            }

        </ListGroup.Item>
    )
}

export default QuestionItem;
