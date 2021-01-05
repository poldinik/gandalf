import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";

const GlobalMessage = () => {

    const dispatch = useDispatch();
    const message = useSelector(state => state.message);
    const show = message.visible;
    const title = message.title;
    const text = message.text;
    const info = message.info;
    const error = message.error;
    const warning = message.warning;
    const success = message.success;

    const onHide = () => {
        dispatch({type: 'UPDATEMESSAGE', message: {...message, visible: false, text: ""}})
    }

    const getIcon = () => {
        if(info){
            return <FontAwesomeIcon icon={faInfoCircle} styel={{color: "#0247A8"}}/>
        }

        if(error){
            return <FontAwesomeIcon icon={faInfoCircle} styel={{color: "#920231"}}/>
        }

        if(warning){
            return <FontAwesomeIcon icon={faInfoCircle} styel={{color: "#a86b02"}}/>
        }

        if(success){
            return <FontAwesomeIcon icon={faInfoCircle} styel={{color: "#299802"}}/>
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter-message"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter-message">
                    {title} {getIcon()}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {text}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Ok</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default GlobalMessage;
